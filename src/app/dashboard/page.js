// app/dashboard/page.js
import Providers from "../provider";
import DashboardClient from "./DashboardClient";

// SEO via Metadata API (works only in server components)
export const metadata = {
  title: "UPSC Preparation Dashboard - Track Your Progress | NextGenPSC",
  description:
    "Monitor your UPSC preparation with personalized analytics: test scores, study progress, streaks, and time studied. Stay on track for the Civil Services Exam.",
  alternates: {
    canonical: "https://www.nextgenpsc.com/dashboard",
  },
  openGraph: {
    title: "UPSC Preparation Dashboard | NextGenPSC",
    description:
      "Your UPSC prep hub: scores, progress, streaks, time studied, and more.",
    url: "https://www.nextgenpsc.com/dashboard",
    siteName: "NextGenPSC",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.nextgenpsc.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGenPSC Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPSC Preparation Dashboard | NextGenPSC",
    description:
      "Track your UPSC preparation with real-time analytics and insights.",
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

export default function Page() {
  return (
  <Providers>
      <DashboardClient />
    </Providers>
  );
}
