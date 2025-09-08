
"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import ChatPanel from "../../../components/chat-panel/ChatPanel";
import PolityBook from "../../../components/study-material/polity/PolityBook";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { chapters } from "../../../components/study-material/AncientHistoryConst";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nextgenpsc.com";
const PAGE_PATH = "/ancient-history";
const CANONICAL = `${SITE_URL.replace(/\/$/, "")}${PAGE_PATH}`;

const AncientApp = () => {
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Ancient Indian History",
    description:
      "Comprehensive study materials for UPSC Ancient Indian History preparation",
    provider: {
      "@type": "Organization",
      name: "UPSC Study Platform",
      sameAs: SITE_URL,
    },
  };

  useEffect(() => {
    // Scroll lock when chat open (mobile-friendly UX)
    if (showChat) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showChat]);

  return (
    <>
      <Head>
        <title>Ancient Indian History - UPSC Study Materials | NextGenPSC</title>

        {/* Primary meta */}
        <meta
          name="description"
          content="Comprehensive notes on Ancient Indian History, civilizations, dynasties, and cultural developments for UPSC Civil Services preparation."
        />
        <meta
          name="keywords"
          content="ancient Indian history, UPSC history, Indus valley civilization, Mauryan empire, Gupta dynasty, ancient India UPSC"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={CANONICAL} />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Ancient Indian History - UPSC Study Materials" />
        <meta
          property="og:description"
          content="Interactive study materials with AI assistance for Ancient Indian History — ideal for UPSC preparation."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        {/* Consider swapping to a real image asset */}
        <meta
          property="og:image"
          content={`${SITE_URL}/og-images/ancient-history-upsc.png`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextgenpsc" />

        {/* Structured data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ancient Indian History</h1>
              <p className="text-muted-foreground">Interactive study materials with AI assistance</p>
            </div>
          </div>
        </header>

        <main className="relative h-[calc(100vh-120px)]" aria-labelledby="page-heading">
          <PolityBook chapters={chapters} subjectId="ancient-history" subjectTitle="Ancient History" />

          {/* Floating Chat Toggle Button */}
          <Button
            onClick={() => setShowChat((s) => !s)}
            className={`fixed z-50 rounded-full h-12 w-12 shadow-lg ${
              isMobile ? "bottom-40 right-4" : "bottom-6 right-6 h-14 w-14"
            }`}
            size="icon"
            variant={showChat ? "default" : "secondary"}
            aria-pressed={showChat}
            aria-label={showChat ? "Close chat" : "Open chat"}
          >
            <MessageCircle className={`${isMobile ? "h-5 w-5" : "h-6 w-6"}`} />
          </Button>

          {/* Floating Chat Panel */}
          {showChat && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="AI study assistant chat"
              className={`fixed z-40 bg-card border border-border rounded-lg shadow-2xl ${
                isMobile ? "inset-x-4 bottom-56 top-32" : "bottom-24 right-6 w-96 h-[500px]"
              }`}
            >
              <ChatPanel onClose={() => setShowChat(false)} />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AncientApp;