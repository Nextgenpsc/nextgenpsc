// NO "use client"
import { Suspense } from "react";
import Script from "next/script";
import ModernHistoryApp from "../../../components/study-material/polity/ModernHistoryApp";

export const metadata = {
  metadataBase: new URL("https://www.nextgenpsc.com"),
  title: { default: "Modern Indian History | NextGenPSC", template: "%s | NextGenPSC" },
  description:
    "Concise, exam-focused Modern Indian History notes for UPSC — colonial rule, reform movements, the freedom struggle, and practice MCQs.",
  shortDescription:
    "Modern Indian History notes for UPSC: British rule, 1857, reform movements, Gandhi, Partition — with practice MCQs.",
  keywords: [
    "Modern Indian history",
    "UPSC modern history notes",
    "British Raj UPSC",
    "1857 revolt UPSC",
    "First War of Independence",
    "Indian National Movement",
    "INC formation 1885",
    "Swadeshi Movement",
    "Gandhi UPSC notes",
    "Government of India Act 1935",
    "Partition 1947",
    "Peasant and tribal movements",
    "History notes for civil services",
    "Modern India spectrum summary"
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-materials/modern-history",
    languages: { "en-US": "https://www.nextgenpsc.com/en-us/study-material/modern-history", "hi-IN": "https://www.nextgenpsc.com/en-us/study-material/modern-history" },
  },
  openGraph: {
    title: "Modern Indian History — UPSC Notes & Practice",
    description:
      "Revision-ready Modern Indian History notes covering colonialism, reform movements, the freedom struggle, and Partition — tailored for UPSC aspirants.",
    url: "https://www.nextgenpsc.com/study-materials/modern-history",
    siteName: "NextGenPSC",
    images: [{ url: "https://www.nextgenpsc.com/og-images/modern-history.jpg", width: 1200, height: 630, alt: "Modern Indian History for UPSC — NextGenPSC" }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Indian History — NextGenPSC",
    description:
      "Modern Indian History notes & practice items for UPSC: British rule to Partition, important leaders, events, and timelines.",
    images: [{ url: "https://www.nextgenpsc.com/og-images/modern-history.jpg", alt: "Modern Indian History for UPSC — NextGenPSC" }],
    creator: "@nextgenpsc",
  },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.ico", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
};

export default function Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.nextgenpsc.com/study-materials/modern-history" },
    "headline": "Modern Indian History — UPSC Notes & Practice",
    "description": "Revision-ready Modern Indian History notes covering colonialism, reform movements, the freedom struggle, and Partition — tailored for UPSC aspirants.",
    "image": "https://www.nextgenpsc.com/og-images/modern-history.jpg",
    "author": { "@type": "Organization", "name": "NextGenPSC", "url": "https://www.nextgenpsc.com" },
    "datePublished": "2024-01-01T00:00:00Z",
    "dateModified": "2024-01-01T00:00:00Z",
    "publisher": { "@type": "Organization", "name": "NextGenPSC", "logo": { "@type": "ImageObject", "url": "https://www.nextgenpsc.com/logo.png" } }
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nextgenpsc.com" },
      { "@type": "ListItem", "position": 2, "name": "Study Materials", "item": "https://www.nextgenpsc.com/study-materials" },
      { "@type": "ListItem", "position": 3, "name": "Modern Indian History", "item": "https://www.nextgenpsc.com/study-materials/modern-history" }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What topics are covered in Modern Indian History for UPSC?",
        "acceptedAnswer": { "@type": "Answer", "text": "Advent of Europeans, Company consolidation (1757–1857), Revolt of 1857, reform movements, nationalism, Gandhian movements, constitutional reforms, and Partition — with summaries and practice MCQs." }
      },
      {
        "@type": "Question",
        "name": "Can I download notes?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes — collect points via bookmarks and export as PDF/DOCX from the study page." }
      }
    ]
  };

  return (
    <>
      <Script id="ld-article" type="application/ld+json">{JSON.stringify(jsonLdArticle)}</Script>
      <Script id="ld-breadcrumb" type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</Script>
      <Script id="ld-faq" type="application/ld+json">{JSON.stringify(faqJsonLd)}</Script>

      {/* server-rendered, crawlable but visually hidden */}
      <section className="sr-only" aria-hidden="false">
        <h1>Modern Indian History: Concise UPSC Notes, Timelines & Practice</h1>
        <p>
          Modern Indian History is a high-priority section for UPSC Prelims and Mains. These
          revision-ready notes cover the British Company's rise, the Revolt of 1857, social reforms,
          the freedom movement, constitutional reforms, and Partition (1947). Each chapter contains
          concise summaries, mains key points, prelims tips and practice MCQs.
        </p>

        <h2>Chapter index</h2>
        <nav aria-label="Modern Indian History chapters">
          <ul>
            <li><a href="/study-materials/modern-history?chapter=Chapter+1%3A+Advent+of+Europeans+in+India">Chapter 1: Advent of Europeans in India</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+2%3A+Decline+of+the+Mughal+Empire">Chapter 2: Decline of the Mughal Empire</a></li>
                        <li><a href="/study-materials/modern-history?chapterChapter+3%3A+Emergence+of+Regional+States">Chapter 3: Emergence of Regional States</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+4%3A+Expansion+and+Consolidation+of+British+Power">Chapter 4: Expansion and Consolidation of British Power</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+5%3A+British+Government+%26+Economic+Policies+%281757–1857%29">Chapter 5: British Government & Economic Policies (1757–1857)</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+6%3A+Social+Reform+Movements">Chapter 6: Social Reform Movements</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+7%3A+People’s+Resistance+before+1857">Chapter 7: People’s Resistance before 1857</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+8%3A+The+revolt+of+1857">Chapter 8: The revolt of 1857</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+9%3A+Growth+of+Nationalism+and+Moderate+Phase+of+Congress">Chapter 9: Growth of Nationalism and Moderate Phase of Congress</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+10%3A+British+Administration+in+India">Chapter 10: British Administration in India</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+11%3A+Era+of+Militant+Nationalism+%281905-1909%29">Chapter 11: Era of Militant Nationalism (1905-1909)</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+12%3A+First+Phase+of+Revolutionary+Activities%281907-1917%29">Chapter 12: First Phase of Revolutionary Activities(1907-1917)</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+13%3A+India’s+Response+to+First+World+War+and+Home+Rule+Movement">Chapter 13: India’s Response to First World War and Home Rule Movement</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+14%3A+Emergence+of+Gandhi">Chapter 14: Emergence of Gandhi</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+15%3A+Non-Cooperation+Movement+and+Khilafat+Movement">Chapter 15: Non-Cooperation Movement and Khilafat Movement</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+16%3A+Emergence+of+Swarajists%2C+Socialist+Ideas%2C+Revolutionary+Activities">Chapter 16: Emergence of Swarajists, Socialist Ideas, Revolutionary Activities</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+17%3A+Struggle+For+Swaraj%3A+1928-1935">Chapter 17: Struggle For Swaraj: 1928-1935</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+18%3A+Period+from+1935-42">Chapter 18: Period from 1935-42</a></li>
            <li><a href="/study-materials/modern-history?chapter=Chapter+19%3A+Period+from+1942-47">Chapter 19: Period from 1942-47</a></li>
            {/* more chapters */}
          </ul>
        </nav>
      </section>

      {/* Interactive client app mounts here */}
      <Suspense fallback={<div />}>
        <ModernHistoryApp />
      </Suspense>
    </>
  );
}
