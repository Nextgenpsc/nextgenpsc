// app/sitemap.xml/route.js
import { NextResponse } from "next/server";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextgenpsc.com";

/**
 * List your public site URLs here.
 * For dynamic pages (e.g. articles) fetch them from your DB and map to <url> entries.
 */
const staticUrls = [
  { loc: `${SITE_ORIGIN}/`, priority: 1.0 },
  { loc: `${SITE_ORIGIN}/study-materials/modern-history`, priority: 0.8 },
  { loc: `${SITE_ORIGIN}/study-materials/ancient-history`, priority: 0.8 },
  { loc: `${SITE_ORIGIN}/study-materials/polity`, priority: 0.8 },
  { loc: `${SITE_ORIGIN}/dashboard`, priority: 0.8 },
  { loc: `${SITE_ORIGIN}/test-series`, priority: 0.8 }
  // add more pages or dynamically generate entries
];

function buildUrlEntry({ loc, lastmod = new Date().toISOString(), priority = 0.5, changefreq = "monthly" }) {
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
}

export async function GET() {
  // If dynamic: fetch pages from DB here and extend staticUrls
  const urls = staticUrls.map((u) => buildUrlEntry(u)).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200", // CDN-friendly
    },
  });
}
