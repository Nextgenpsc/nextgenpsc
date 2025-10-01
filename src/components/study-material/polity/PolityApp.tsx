"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// keep your existing components/hooks
import ChatPanel from "../../chat-panel/ChatPanel";
import PolityBook from "./PolityBook";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PolityAppClient() {
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Indian Polity & Governance</h1>
              <p className="text-muted-foreground">Interactive study materials with AI assistance</p>
            </div>
          </div>
        </header>

        <div className="relative h-[calc(100vh-120px)]">
          <PolityBook subjectTitle="Indian polity" />

          {/* Floating Chat Toggle Button */}
          <Button
            onClick={() => setShowChat((s) => !s)}
            className={`fixed z-50 rounded-full h-12 w-12 shadow-lg ${
              isMobile ? "bottom-40 right-4" : "bottom-6 right-6 h-14 w-14"
            }`}
            size="icon"
            variant={showChat ? "default" : "secondary"}
            aria-label="Toggle Chat"
          >
            <MessageCircle className={isMobile ? "h-5 w-5" : "h-6 w-6"} />
          </Button>

          {/* Floating Chat Panel */}
          {showChat && (
            <div
              className={`fixed z-40 bg-card border border-border rounded-lg shadow-2xl ${
                isMobile ? "inset-x-4 bottom-56 top-32" : "bottom-24 right-6 w-96 h-[500px]"
              }`}
            >
              <ChatPanel onClose={() => setShowChat(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
