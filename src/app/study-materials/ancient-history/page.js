// NO "use client"
import { Suspense } from "react";
import Script from "next/script";
import AncientApp from "../../../components/study-material/polity/AncientApp";

export const metadata = {
  metadataBase: new URL("https://www.nextgenpsc.com"),
  title: { default: "Ancient Indian History | NextGenPSC", template: "%s | NextGenPSC" },
  description:
    "Concise, exam-focused Ancient Indian History notes for UPSC — Indus Valley Civilization, Vedic Age, Mauryan Empire, Gupta Age, Sangam period, art and culture, and practice MCQs.",
  shortDescription:
    "Ancient Indian History UPSC notes: Harappan culture, Vedic period, Mahajanapadas, Mauryan & Gupta empires, Sangam literature, Buddhism, Jainism, art and architecture.",
  keywords: [
    "Ancient Indian history",
    "UPSC ancient history notes",
    "Indus Valley Civilization UPSC",
    "Vedic Age UPSC",
    "Mahajanapadas UPSC",
    "Mauryan Empire UPSC",
    "Ashoka inscriptions UPSC",
    "Gupta Empire UPSC",
    "Sangam Age UPSC",
    "Buddhism UPSC notes",
    "Jainism UPSC notes",
    "Indian art and culture UPSC",
    "Harappan sites UPSC",
    "History notes for civil services",
    "Ancient India UPSC prelims and mains"
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-materials/ancient-history",
    languages: { "en-US": "https://www.nextgenpsc.com/en-us/study-material/ancient-history", "hi-IN": "https://www.nextgenpsc.com/en-us/study-material/ancient-history" },
  },
  openGraph: {
    title: "Ancient Indian History — UPSC Notes & Practice",
    description:
      "Revision-ready Ancient Indian History notes covering Harappan Civilization, Vedic Age, Mauryan & Gupta empires, Buddhism, Jainism, Sangam Age, and Indian art & culture.",
    url: "https://www.nextgenpsc.com/study-materials/ancient-history",
    siteName: "NextGenPSC",
    images: [{ url: "https://www.nextgenpsc.com/og-images/ancient-history.jpg", width: 1200, height: 630, alt: "Ancient Indian History for UPSC — NextGenPSC" }],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ancient Indian History — NextGenPSC",
    description:
      "UPSC Ancient Indian History notes: Indus Valley, Vedic period, Buddhism, Jainism, Mauryan & Gupta empires, Sangam Age, and art & architecture.",
    images: [{ url: "https://www.nextgenpsc.com/og-images/ancient-history.jpg", alt: "Ancient Indian History for UPSC — NextGenPSC" }],
    creator: "@nextgenpsc",
  },
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.ico", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
};

export default function Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.nextgenpsc.com/study-materials/ancient-history" },
    "headline": "Ancient Indian History — UPSC Notes & Practice",
    "description": "Ancient Indian History notes for UPSC covering Indus Valley Civilization, Vedic Age, Mahajanapadas, Buddhism, Jainism, Mauryan Empire, Gupta Empire, Sangam Age, and art & architecture.",
    "image": "https://www.nextgenpsc.com/og-images/ancient-history.jpg",
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
      { "@type": "ListItem", "position": 3, "name": "Ancient Indian History", "item": "https://www.nextgenpsc.com/study-materials/ancient-history" }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What topics are covered in Ancient Indian History for UPSC?",
        "acceptedAnswer": { "@type": "Answer", "text": "Ancient Indian History includes Indus Valley Civilization, Vedic Age, Mahajanapadas, rise of Magadha, Buddhism, Jainism, Mauryan Empire, Gupta Age, Sangam period, post-Gupta kingdoms, and Indian art and architecture." }
      },
      {
        "@type": "Question",
        "name": "What is the importance of Ancient Indian History in UPSC exams?",
        "acceptedAnswer": { "@type": "Answer", "text": "Ancient Indian History is vital for UPSC Prelims and Mains. It covers Indus Valley sites, Vedic literature, religious movements, dynasties, inscriptions, and art, which are frequent in GS-I and Art & Culture." }
      },
      {
        "@type": "Question",
        "name": "Which are the most important Ancient Indian sites for UPSC?",
        "acceptedAnswer": { "@type": "Answer", "text": "Key sites include Harappa, Mohenjodaro, Dholavira, Kalibangan, Lothal, Sanchi, Bodh Gaya, Nalanda, Ajanta & Ellora caves, and Mahabalipuram." }
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
        <h1>Ancient Indian History: Concise UPSC Notes, Key Topics & Quick Revision</h1>
        <p>
          Ancient Indian History is crucial for UPSC preparation. It covers the Indus Valley Civilization, 
          Vedic Age, Mahajanapadas, Buddhism, Jainism, Mauryan Empire, Gupta Age, Sangam period, and 
          Indian art & architecture. These concise notes provide Prelims tips, Mains key points, and practice MCQs.
        </p>

        <h2>Chapter index</h2>
        <nav aria-label="Ancient Indian History chapters">
          <ul>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+1%3A+Stone+age">Stone age</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+2%3A+Chalcolithic+age%28Copper+Age%29">Chalcolithic age(Copper Age)</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+3%3A+Indus+Valley+Civilization">Indus Valley Civilization</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+4%3A+Vedic+age">Vedic age</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+5%3A+The+Mahajanapadas">The Mahajanapadas</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+6%3A+Buddhism+and+Jainism">Buddhism and Jainism</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+7%3A+Mauryan+Empire">Mauryan Empire</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+8%3A+POST-MAURYAN+PERIOD">POST-MAURYAN PERIOD</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+9%3A+GUPTA+PERIOD">Gupta Empire</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+10%3A+Post-Gupta+Period">Post-Gupta Age</a></li>
            <li><a href="/study-materials/ancient-history?chapter=Chapter+11%3A+Sangam+Age">Sangam Age</a></li>
          </ul>
        </nav>
      </section>

      {/* Interactive client app mounts here */}
      <Suspense fallback={<div />}>
        <AncientApp />
      </Suspense>
    </>
  );
}
