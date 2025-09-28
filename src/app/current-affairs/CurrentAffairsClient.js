// app/current-affairs/CurrentAffairsClient.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Download } from "lucide-react";
import currentAffairsData from "@/data/currentAffairsData.json";

// Adjustable SEO-friendly categories
const subjects = [
  "All",
  "Polity",
  "Economy",
  "Environment",
  "International Relations",
  "Science & Technology",
  "History",
  "Geography",
];

const PAGE_SIZE = 9;

export default function CurrentAffairsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // basic pagination via query param ?page=2 (more SEO friendly than client-only state)
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return currentAffairsData.filter((a) => {
      const matchesQuery =
        !q ||
        a.title?.toLowerCase().includes(q) ||
        a.summary?.toLowerCase().includes(q);
      const matchesSubject =
        selectedSubject === "All" ||
        a.subject === selectedSubject ||
        a.tags?.some?.((t) => t === selectedSubject);
      return matchesQuery && matchesSubject;
    });
  }, [searchTerm, selectedSubject]);

  // slice articles for pagination
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedArticles = filteredArticles.slice(start, end);
  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));

  useEffect(() => {
    // Reset to page 1 on new filters
    router.replace(`/current-affairs?page=1`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedSubject, activeTab]);

  const changePage = (p) => {
    if (p < 1 || p > pageCount) return;
    router.push(`/current-affairs?page=${p}`);
  };

  function ArticleCard({ article }) {
    const alt = article.imageAlt || `${article.title} – UPSC current affairs`;
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          {article.image && (
            <div className="relative w-full h-48 mb-4">
              <Image
                src={article.image}
                alt={alt}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                priority={false}
              />
            </div>
          )}
          <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
          <CardDescription className="text-sm">{article.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {/* External articles open in new tab */}
            <Link href={article.url} target="_blank" rel="noopener" className="flex-1">
              <Button size="sm" className="w-full">
                <BookOpen className="h-3 w-3 mr-1" />
                Read Full Article
              </Button>
            </Link>
            {/* Link internally to your quiz route when ready */}
            <Link href={`/current-affairs/quiz/${article.id}`} className="flex-1">
              <Button size="sm" variant="outline" className="w-full">
                Quiz
              </Button>
            </Link>
          </div>
          {/* Internal linking: map to GS or subject hubs if available */}
          {article.subject && (
            <div className="mt-3 text-xs text-muted-foreground">
              Subject:{" "}
              <Link
                href={`/current-affairs?subject=${encodeURIComponent(
                  article.subject
                )}&page=1`}
                className="underline hover:text-primary"
              >
                {article.subject}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs (visible, complements JSON-LD) */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary underline">
              Home
            </Link>
          </li>
          <li>›</li>
          <li className="text-foreground">Current Affairs</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          UPSC Current Affairs – Daily Briefs & Monthly Compilations
        </h1>
        <p className="text-muted-foreground">
          Curated, exam-focused current affairs aligned to GS papers. Search, filter by
          subject, and download monthly PDFs for revision.
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList aria-label="Current Affairs View">
          <TabsTrigger value="daily">Daily Brief</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Compilation</TabsTrigger>
          <TabsTrigger value="subject">Subject-wise</TabsTrigger>
        </TabsList>

        {/* DAILY */}
        <TabsContent value="daily" className="space-y-6">
          {/* Filters */}
          <section
            aria-label="Search and Filters"
            className="flex flex-col gap-4 p-4 bg-muted rounded-lg md:flex-row md:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                aria-label="Search current affairs articles"
                placeholder="Search articles…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {subjects.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={selectedSubject === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </section>

          {/* Articles */}
          <section aria-label="Articles list">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pagedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination (server-friendly via query string) */}
            {pageCount > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                <Button variant="outline" size="sm" onClick={() => changePage(page - 1)} disabled={page <= 1}>
                  Prev
                </Button>
                <span className="text-sm">
                  Page {page} of {pageCount}
                </span>
                <Button variant="outline" size="sm" onClick={() => changePage(page + 1)} disabled={page >= pageCount}>
                  Next
                </Button>
              </nav>
            )}
          </section>
        </TabsContent>

        {/* MONTHLY */}
        <TabsContent value="monthly" className="space-y-6">
          <Card as="section" aria-label="Monthly compilations">
            <CardHeader>
              <CardTitle>Monthly Compilations</CardTitle>
              <CardDescription>
                Download subject-wise monthly compilations for systematic revision.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.slice(1).map((subject) => (
                  <div key={subject} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{subject}</h3>
                    <p className="text-sm text-muted-foreground mb-3">December 2024</p>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      {/* Replace with your actual PDF url */}
                      <Link href={`/downloads/current-affairs/${subject.toLowerCase()}-dec-2024.pdf`}>
                        <Download className="h-3 w-3 mr-1" />
                        Download PDF
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUBJECT-WISE HUB */}
        <TabsContent value="subject" className="space-y-6">
          <section aria-label="Subjects">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.slice(1).map((subject) => (
                <Card key={subject} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{subject}</CardTitle>
                    <CardDescription>{filteredArticles.length} articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href={`/current-affairs?subject=${encodeURIComponent(subject)}&page=1`}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Articles
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Helpful internal links for crawlability */}
      <footer className="mt-12 border-t pt-6 text-sm text-muted-foreground">
        <div className="flex flex-wrap gap-4">
          <Link href="/test-series" className="underline hover:text-primary">
            Take UPSC Mock Tests
          </Link>
          <Link href="/study-materials" className="underline hover:text-primary">
            Study Materials
          </Link>
          <Link href="/current-affairs" className="underline hover:text-primary">
            Current Affairs Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
