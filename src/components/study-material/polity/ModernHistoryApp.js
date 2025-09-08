"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import ChatPanel from "@/components/chat-panel/ChatPanel";
// import ChatPanel from "../components/chat-panel/ChatPanel";
import PolityBook from "../../study-material/polity/PolityBook";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { chapters } from "../ModernHistoryConst";

const ModernHistoryStudy = () => {
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

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
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Modern Indian History</h1>
              <p className="text-muted-foreground">Interactive study materials with AI assistance</p>
            </div>
          </div>
        </header>

        <main className="relative h-[calc(100vh-120px)]" aria-labelledby="page-heading">
          <PolityBook chapters={chapters} subjectId="modern-history" subjectTitle="Modern History" />

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

export default ModernHistoryStudy;