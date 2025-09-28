// app/current-affairs/page.js
import { Suspense } from "react";
import CurrentAffairsClient from "./CurrentAffairsClient";

// (Optional) revalidate the page every 6 hours for fresher SEO
export const revalidate = 21600; // seconds

export const metadata = {
  title:
    "UPSC Current Affairs – Daily Briefs, Subject-wise Articles & Monthly PDFs | NextGenPSC",
  description:
    "Curated UPSC current affairs: daily briefs, subject-wise coverage, and monthly compilations. Optimized for Prelims & Mains with exam-focused summaries.",
  alternates: {
    canonical: "https://www.nextgenpsc.com/current-affairs",
  },
  openGraph: {
    title:
      "UPSC Current Affairs – Daily, Subject-wise & Monthly | NextGenPSC",
    description:
      "Stay UPSC-ready with curated current affairs, aligned to GS papers. Download monthly PDFs and read exam-focused briefs.",
    url: "https://www.nextgenpsc.com/current-affairs",
    siteName: "NextGenPSC",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGenPSC Current Affairs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "UPSC Current Affairs – Daily, Subject-wise & Monthly | NextGenPSC",
    description:
      "Curated, exam-focused current affairs with monthly PDFs and subject-wise browsing.",
    images: ["https://www.nextgenpsc.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// JSON-LD helpers (rendered server-side for SEO)
function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nextgenpsc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Current Affairs",
        item: "https://www.nextgenpsc.com/current-affairs",
      },
    ],
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "UPSC Current Affairs – NextGenPSC",
    description:
      "Curated UPSC current affairs: daily briefs, subject-wise coverage, and monthly compilations.",
    url: "https://www.nextgenpsc.com/current-affairs",
    isPartOf: {
      "@type": "WebSite",
      name: "NextGenPSC",
      url: "https://www.nextgenpsc.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
    </>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd />
      <Suspense fallback={<div />}>
       <CurrentAffairsClient />
      </Suspense>
    </>
  );
}
