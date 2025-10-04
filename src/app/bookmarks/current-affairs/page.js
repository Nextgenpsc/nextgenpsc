// app/current-affairs-bookmarks/page.js
import CurrentAffairsBookmarks from "./CurrentAffairsBookmarks";

export const metadata = {
  title: "Bookmarked Current Affairs — UPSC Prep | NextGenPSC",
  description:
    "View and manage your saved current affairs articles for UPSC preparation all in one place.",
  alternates: { canonical: "https://www.nextgenpsc.com/current-affairs-bookmarks" },
  openGraph: {
    title: "Bookmarked Current Affairs — UPSC Prep",
    description:
      "Access all your saved UPSC current affairs articles easily and stay updated for your exam preparation.",
    url: "https://www.nextgenpsc.com/current-affairs-bookmarks",
    siteName: "NextGenPSC",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGenPSC Current Affairs Bookmarks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookmarked Current Affairs — UPSC Prep | NextGenPSC",
    description:
      "Easily manage and access all your saved current affairs for UPSC exam preparation.",
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
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function Page() {
  return <CurrentAffairsBookmarks />;
}
