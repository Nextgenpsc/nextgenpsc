// app/chat/page.js
import ChatClient from "./chat";

export const metadata = {
  title: "Study Chat — UPSC Preparation Platform | NextGenPSC",
  description:
    "Connect with fellow UPSC aspirants, share notes, upload files, and discuss current affairs in a collaborative study chat.",
  alternates: { canonical: "https://www.nextgenpsc.com/chat" },
  openGraph: {
    title: "Study Chat — UPSC Preparation Platform",
    description:
      "Join the discussion: notes sharing, Q&A, and current affairs with UPSC aspirants.",
    url: "https://www.nextgenpsc.com/chat",
    siteName: "NextGenPSC",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGenPSC Study Chat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Chat — UPSC Preparation Platform | NextGenPSC",
    description:
      "Chat with UPSC aspirants, share study materials, and stay on top of current affairs.",
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
  return <ChatClient />;
}
