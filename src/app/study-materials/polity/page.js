// NO "use client"
import { Suspense } from "react";
import Script from "next/script";
import PolityApp from "../../../components/study-material/polity/PolityApp";

export const metadata = {
  metadataBase: new URL("https://www.nextgenpsc.com"),
  title: {
    default: "Indian Polity & Governance | NextGenPSC",
    template: "%s | NextGenPSC",
  },
  description:
    "Concise, exam-focused Polity & Governance notes for UPSC — Constitution, institutions, fundamental rights, federalism, Parliament, judiciary, and practice MCQs.",
  shortDescription:
    "UPSC Polity notes: Constitution, FRs, DPSP, Parliament, Judiciary, federalism, local government — with revision aids & practice MCQs.",
  keywords: [
    "Indian polity",
    "UPSC polity notes",
    "Indian Constitution UPSC",
    "fundamental rights UPSC",
    "DPSP",
    "Parliament and State Legislature",
    "Judiciary UPSC",
    "federalism",
    "local government 73rd 74th",
    "Governor and President UPSC",
    "constitutional bodies",
    "polity practice MCQs"
  ],
  authors: [{ name: "NextGenPSC", url: "https://www.nextgenpsc.com" }],
  creator: "NextGenPSC",
  publisher: "NextGenPSC",
  alternates: {
    canonical: "https://www.nextgenpsc.com/study-material/polity",
    languages: {
      "en-US": "https://www.nextgenpsc.com/en-us/study-material/polity",
      "hi-IN": "https://www.nextgenpsc.com/hi-in/study-material/polity"
    },
  },
  openGraph: {
    title: "Indian Polity & Governance — UPSC Notes & Practice",
    description:
      "Revision-ready Polity notes: Constitution, rights, Parliament, federalism, judiciary, local bodies — tailored for UPSC aspirants.",
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
  twitter: {
    card: "summary_large_image",
    title: "Indian Polity & Governance — NextGenPSC",
    description:
      "UPSC Polity notes & practice: Constitution, FRs, DPSP, Parliament, Judiciary, federalism, local bodies.",
    images: [{ url: "https://www.nextgenpsc.com/og-images/polity.jpg", alt: "Indian Polity & Governance — NextGenPSC" }],
    creator: "@nextgenpsc",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
  const url = "https://www.nextgenpsc.com/study-material/polity";

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: "Indian Polity & Governance — UPSC Notes & Practice",
    description:
      "Concise, UPSC-focused Polity notes covering the Constitution, institutions, fundamental rights, federalism, Parliament, judiciary, and local government.",
    image: "https://www.nextgenpsc.com/og-images/polity.jpg",
    author: { "@type": "Organization", name: "NextGenPSC", url: "https://www.nextgenpsc.com" },
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: "2024-01-01T00:00:00Z",
    publisher: {
      "@type": "Organization",
      name: "NextGenPSC",
      logo: { "@type": "ImageObject", url: "https://www.nextgenpsc.com/logo.png" },
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nextgenpsc.com" },
      { "@type": "ListItem", position: 2, name: "Study Material", item: "https://www.nextgenpsc.com/study-material" },
      { "@type": "ListItem", position: 3, name: "Polity & Governance", item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What topics are covered in Indian Polity for UPSC?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Constitutional framework, Preamble, Fundamental Rights & DPSP, Union & State governments, Parliament and State Legislatures, Judiciary, Federalism, Local Government (73rd/74th), Constitutional/Statutory Bodies, and Polity MCQs.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Polity notes?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Bookmark chapters as you study and export consolidated notes as PDF/DOCX from the study page.",
        },
      },
    ],
  };

  return (
    <>
      <Script id="ld-article" type="application/ld+json">
        {JSON.stringify(jsonLdArticle)}
      </Script>
      <Script id="ld-breadcrumb" type="application/ld+json">
        {JSON.stringify(jsonLdBreadcrumb)}
      </Script>
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      {/* server-rendered, crawlable but visually hidden content for SEO */}
      <section className="sr-only" aria-hidden="false">
        <h1>Indian Polity & Governance: UPSC Notes, Key Concepts & Practice</h1>
        <p>
          High-yield Polity coverage for UPSC Prelims and Mains. Revise the Constitution’s philosophy,
          rights framework, separation of powers, legislative-executive-judicial relations, federalism,
          local bodies, and contemporary governance — with crisp summaries, mains points, prelims tips, and MCQs.
        </p>

        <h2>Chapter index</h2>
        <nav aria-label="Polity chapters">
          <ul>
            <li><a href="/study-material/polity">Making of the Constitution</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+2%3A+Salient+Features+of+the+Indian+Constitution">Salient Features of the Indian Constitution</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+2%3A+Preamble">Preamble</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+3%3A+Evolution+of+States+%26+Union+Territories">Evolution of States & Union Territories</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+4%3A+Citizenship+">Citizenship</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+5%3A+Fundamental+Rights">Fundamental Rights</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+6%3A+Directive+Principles+of+State+Policy+%28DPSP%29">Directive Principles of State Policy (DPSP)</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+7%3A+Amendment+and+Basic+Structure">Amendment and Basic Structure</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+8%3A+Parliamentary+System+of+Government">Parliamentary System of Government</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+9%3A+Union+Executive">Union Executive</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+10%3A+State+Executive">State Executive</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+11%3A+State+Legislature">State Legislature</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+12%3A+Centre-State+Relations">Centre-State Relations</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+13%3A+Inter-State+Relations">Inter-State Relations</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+14%3A+Emergency+Provisions">Emergency Provisions</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+15%3A+Supreme+Court">Supreme Court</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+16%3A+High+Court">High Court</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+17%3A+Local+Government">Local Government</a></li>
            <li><a href="/study-material/polity?chapter=Chapter+18%3A+UTs+%2B+Scheduled+and+Tribal+Areas">UTs + Scheduled and Tribal Areas</a></li>

          </ul>
        </nav>
      </section>

      {/* Interactive client app mounts here */}
      <Suspense fallback={<div />} >
        <PolityApp />
      </Suspense>
    </>
  );
}
