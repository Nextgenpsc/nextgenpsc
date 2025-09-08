// NO "use client"
import { Suspense } from "react";
import ModernHistoryApp from "../../../components/study-material/polity/ModernHistoryApp";

export const metadata = {
  title: {
    default: "Modern Indian History | NextGenPSC",
    template: "%s | NextGenPSC",
  },
  description:
    "Concise, exam-focused Modern Indian History notes for UPSC — covering colonial rule, freedom movement, key acts & events, leaders, socio-economic impact, and practice MCQs.",
  // compact description for SERP (<= 155 chars)
  shortDescription:
    "Modern Indian History notes for UPSC: British rule, 1857, social & economic changes, freedom movement, Gandhi to Partition — with practice MCQs.",
  keywords: [
    "Modern Indian history",
    "UPSC modern history",
    "British Raj",
    "1857 revolt",
    "Indian National Movement",
    "Gandhi",
    "Partition 1947",
    "freedom struggle",
    "modern india upsc",
    "history notes civil services",
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-material/modern-history?chapter=Chapter+1%3A+Advent+of+Europeans+in+India",
    languages: {
      "en-US": "https://www.nextgenpsc.com/en-us/study-material/modern-history",
    },
  },
  openGraph: {
    title: "Modern Indian History — UPSC Notes & Practice",
    description:
      "Revision-ready Modern Indian History notes covering colonialism, reform movements, the freedom struggle, and Partition — tailored for UPSC aspirants.",
    url: "https://www.nextgenpsc.com/study-material/modern-history?chapter=Chapter+1%3A+Advent+of+Europeans+in+India",
    siteName: "NextGenPSC",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-images/modern-history.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Indian History for UPSC — NextGenPSC",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Indian History — NextGenPSC",
    description:
      "Modern Indian History notes & practice items for UPSC: British rule to Partition, important leaders, events, and timelines.",
    images: ["https://www.nextgenpsc.com/og-images/modern-history.jpg"],
    creator: "@nextgenpsc", // replace with your twitter handle
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<div />}>
        <ModernHistoryApp />
      </Suspense>
    </>
  );
}
