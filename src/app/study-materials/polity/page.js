// NO "use client"
import { Suspense } from "react";
import PolityApp from "../../../components/study-material/polity/PolityApp";

export const metadata = {
  title: {
    default: "Indian Polity & Governance | NextGenPSC",
    template: "%s | NextGenPSC",
  },
  description:
    "Comprehensive, exam-focused notes on Indian Polity & Governance for UPSC — Constitution, institutions, public policy, fundamental rights, and practice questions.",
  // short description (<= 155 chars) for SERPs
  shortDescription:
    "Indian Polity & Governance notes for UPSC: Constitution, Parliament, Judiciary, Fundamental Rights, and governance models with practice questions.",
  keywords: [
    "Indian polity",
    "UPSC governance",
    "Indian Constitution notes",
    "political science UPSC",
    "fundamental rights",
    "parliament and legislature",
    "public policy UPSC",
    "governance notes",
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-material/polity",
    languages: {
      "en-US": "https://www.nextgenpsc.com/en-us/study-material/polity",
    },
  },
  // Open Graph (social link preview)
  openGraph: {
    title: "Indian Polity & Governance — UPSC Study Materials",
    description:
      "Deep-dive Polity notes for UPSC aspirants: Constitution, institutions, rights, governance, and model questions for revision.",
    url: "https://www.nextgenpsc.com/study-material/polity",
    siteName: "NextGenPSC",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-images/polity.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Polity & Governance for UPSC — NextGenPSC",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: "Indian Polity & Governance — NextGenPSC",
    description:
      "Polity notes & practice items for UPSC: Constitution, Parliament, Judiciary, federalism, rights, and governance concepts.",
    images: ["https://www.nextgenpsc.com/og-images/polity.jpg"],
    creator: "@nextgenpsc", // replace with your twitter handle
  },
  // arbitrary meta tags (server-rendered). These produce: <meta name="reading-level" ...> etc.
  other: {
    "reading-level": "advanced",
    "topic-tags": "Constitution,Parliament,Judiciary,Fundamental Rights,Federalism,Governance",
  },
  // robots and googlebot preferences
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
  <Suspense fallback={<div />}>
     <PolityApp />
    </Suspense>
  );
}
