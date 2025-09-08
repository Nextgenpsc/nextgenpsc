// NO "use client"
import { Suspense } from "react";
import AncientApp from "../../../components/study-material/polity/AncientApp";

/**
 * Replace the example URLs, image paths and twitter handle with your real values.
 */
export const metadata = {
  title: {
    default: "Ancient Indian History | NextGenPSC",
    template: "%s | NextGenPSC",
  },
  description:
    "Comprehensive, exam-focused notes on Ancient Indian History for UPSC preparation — covering Indus Valley, Vedic period, Mauryan & Gupta empires, regional kingdoms, art, culture, and key timelines with MCQs and practice questions.",
  keywords: [
    "Ancient Indian history",
    "UPSC history notes",
    "Indus Valley Civilization",
    "Mauryan Empire",
    "Gupta Dynasty",
    "ancient india upsc",
    "history notes for civil services",
    "ancient history timeline",
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  // canonical / alternate URLs
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-material/ancient-history",
    languages: {
      "en-US": "https://www.nextgenpsc.com/en-us/study-material/ancient-history",
    },
  },
  // Open Graph for social previews
  openGraph: {
    title: "Ancient Indian History — Comprehensive UPSC Notes",
    description:
      "Revision-ready Ancient Indian History notes for UPSC: civilizations, dynasties, administration, religion, culture, art, and important MCQs.",
    url: "https://www.nextgenpsc.com/study-material/ancient-history",
    siteName: "NextGenPSC",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-images/ancient-history.jpg",
        width: 1200,
        height: 630,
        alt: "Ancient Indian History for UPSC — NextGenPSC",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  // Twitter card meta
  twitter: {
    card: "summary_large_image",
    title: "Ancient Indian History — NextGenPSC",
    description:
      "Exam-ready Ancient Indian History notes and practice items tailored for UPSC aspirants.",
    images: ["https://www.nextgenpsc.com/og-images/ancient-history.jpg"],
    creator: "@nextgenpsc", // <- replace with your twitter handle
  },
  // robots rules
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icons & theme colors
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  // optional: structured data (you can add JSON-LD in the page markup if you want)
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <AncientApp />
    </Suspense>
  );
}
