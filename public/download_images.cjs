// download_images_wikimedia_fix.cjs
// Usage: node download_images_wikimedia_fix.cjs
// Saves files to ./images/
// Works in CommonJS (use .cjs to avoid ESM/CommonJS issues on Windows)

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const IMAGES_LIST = path.join(process.cwd(), 'images_list.json');
const IMAGES_DIR = path.join(process.cwd(), 'images');

if (!fs.existsSync(IMAGES_LIST)) {
  console.error('images_list.json not found in', process.cwd());
  process.exit(1);
}
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

function httpGetRaw(url) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const getter = parsed.protocol === 'https:' ? https : http;
      const req = getter.get(url, { headers: { 'User-Agent': 'Node downloader (no lib)' } }, (res) => {
        resolve(res);
      });
      req.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}

function downloadToFile(url, dest) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (err) {
      return reject(new Error('Invalid URL: ' + url));
    }
    const getter = parsed.protocol === 'https:' ? https : http;
    const req = getter.get(url, { headers: { 'User-Agent': 'Node downloader (no lib)' } }, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).href;
        return downloadToFile(next, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Status Code ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(() => resolve(dest)));
      fileStream.on('error', (err) => reject(err));
    });
    req.on('error', (err) => reject(err));
  });
}

async function queryWikimediaImageUrlByTitle(fileTitle) {
  // fileTitle should be like "File:Name.jpg"
  const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=' +
    encodeURIComponent(fileTitle);
  const res = await httpGetRaw(apiUrl);
  const body = await streamToString(res);
  const json = JSON.parse(body);
  if (json && json.query && json.query.pages) {
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    if (page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
      return page.imageinfo[0].url;
    }
  }
  throw new Error('No imageinfo.url found for ' + fileTitle);
}

async function searchWikimediaFile(keyword) {
  // Uses search API to find file pages matching keyword
  const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srsearch=' +
    encodeURIComponent(keyword) + '&srnamespace=6&srprop=snippet|titlesnippet&srlimit=5';
  const res = await httpGetRaw(apiUrl);
  const body = await streamToString(res);
  const json = JSON.parse(body);
  if (json && json.query && Array.isArray(json.query.search)) {
    return json.query.search.map(s => s.title); // titles like "File:Something.jpg"
  }
  return [];
}

function streamToString(stream) {
  return new Promise((resolve) => {
    let data = '';
    stream.on('data', (chunk) => data += chunk);
    stream.on('end', () => resolve(data));
    stream.on('error', () => resolve(data));
  });
}

function basenameNoExt(name) {
  return name.replace(/\.[^/.]+$/, '');
}

(async () => {
  const raw = fs.readFileSync(IMAGES_LIST, 'utf8');
  let items;
  try {
    items = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in images_list.json:', err.message);
    process.exit(1);
  }

  for (const it of items) {
    const filename = it.filename;
    let url = it.url && it.url.trim() ? it.url.trim() : null;
    const dest = path.join(IMAGES_DIR, filename);
    console.log('---\nTarget:', filename);

    // 1) Try direct URL
    if (url) {
      try {
        console.log('Trying direct URL:', url);
        await downloadToFile(url, dest);
        console.log('✅ Downloaded (direct):', filename);
        continue;
      } catch (err) {
        console.warn('Direct download failed:', err.message);
      }
    } else {
      console.log('No direct URL provided, will try Wikimedia lookups.');
    }

    // 2) Try exact title lookup: File:<basename>
    const base = basenameNoExt(filename);
    const extensions = ['.jpg', '.jpeg', '.png', '.svg', '.tif', '.gif'];
    const probableTitles = [];

    // If filename already contains File:, use it as-is
    if (/^File:/i.test(filename)) probableTitles.push(filename);
    else {
      // push common possibilities
      for (const ext of extensions) {
        probableTitles.push('File:' + base + ext);
      }
      // Also try the filename as-is (if it already has extension)
      probableTitles.push('File:' + filename);
    }

    let downloaded = false;
    // Try exact title queries
    for (const title of probableTitles) {
      try {
        console.log('Looking up exact title on Commons:', title);
        const imageUrl = await queryWikimediaImageUrlByTitle(title);
        console.log('Wikimedia returned URL:', imageUrl);
        await downloadToFile(imageUrl, dest);
        console.log('✅ Downloaded (via title lookup):', filename);
        downloaded = true;
        break;
      } catch (err) {
        // continue to next title
        // console.warn('Title lookup failed for', title, '->', err.message);
      }
    }
    if (downloaded) continue;

    // 3) Fallback: search Commons by base keyword
    try {
      console.log('Searching Commons for probable file titles using keyword:', base);
      const hits = await searchWikimediaFile(base);
      if (hits.length === 0) {
        console.warn('No search hits on Commons for', base);
      } else {
        console.log('Search hits:', hits.slice(0, 5).join(' | '));
        // try the first few hits, get imageinfo
        for (const hitTitle of hits.slice(0, 5)) {
          try {
            console.log('Trying search-hit title:', hitTitle);
            const imageUrl = await queryWikimediaImageUrlByTitle(hitTitle);
            console.log('Wikimedia returned URL:', imageUrl);
            await downloadToFile(imageUrl, dest);
            console.log('✅ Downloaded (via search-hit):', filename, 'from', hitTitle);
            downloaded = true;
            break;
          } catch (err) {
            // continue trying next hit
          }
        }
      }
    } catch (err) {
      console.warn('Search lookup failed:', err.message);
    }

    if (!downloaded) {
      console.error('❌ Failed to fetch', filename);
      console.error('   Suggestions:');
      console.error('   1) Open https://commons.wikimedia.org and search for the exact filename/title.');
      console.error('   2) On the file page click "Original file" and copy that direct URL into images_list.json.');
      console.error('   3) If the file is not on Commons, pick another image or remove the entry.');
    }
  }

  console.log('\nAll attempts complete. Check the images/ folder.');
})();
