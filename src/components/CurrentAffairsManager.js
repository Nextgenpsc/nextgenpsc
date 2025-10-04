"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

export default function CurrentAffairsManager() {
  const [jsonInput, setJsonInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Parse and normalize to an array
      const parsed = JSON.parse(jsonInput);
      const articles = Array.isArray(parsed) ? parsed : [parsed];

      // Upsert each article (insert or update if article_id exists)
      for (const article of articles) {
        const payload = {
          article_id: article.id,
          title: article.title,
          image: article.image,
          url: article.url,
          summary: article.summary,
          details: article.details,
        };

        const { error } = await supabase
          .from("current_affairs")
          .upsert(payload, { onConflict: "article_id" });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Successfully added/updated ${articles.length} article(s)`,
      });

      setJsonInput("");
    } catch (err) {
      console.error("Error uploading current affairs:", err);
      const message = err?.message || "Failed to upload current affairs";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Current Affairs</CardTitle>
        <CardDescription>
          Upload current affairs articles in JSON format. The structure should include id, title, image, url, summary, and details fields.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={`Paste JSON here... Example:\n[\n  {\n    "id": "article-id",\n    "title": "Article Title",\n    "image": "/path/to/image.jpg",\n    "url": "/current-affairs/article-id",\n    "summary": "Brief summary...",\n    "details": { }\n  }\n]`}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
        <Button onClick={handleUpload} disabled={isLoading}>
          <Upload className="h-4 w-4 mr-2" />
          {isLoading ? "Uploading..." : "Upload Current Affairs"}
        </Button>
      </CardContent>
    </Card>
  );
}
