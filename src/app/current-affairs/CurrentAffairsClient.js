"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Target, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const subjects = ["All", "Polity", "Economy", "Environment", "International Relations", "Science & Technology", "History", "Geography"];
const ITEMS_PER_PAGE = 9;

export default function CurrentAffairs() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles from Supabase
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("current_affairs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%`);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      setArticles(data || []);
      setFilteredArticles(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const ArticleCard = ({ article }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
        <CardDescription className="text-sm">{article.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Link href={article.url} className="flex-1" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full">
              <BookOpen className="h-3 w-3 mr-1" />
              Read Full Article
            </Button>
          </Link>
          <Button size="sm" variant="outline">
            <Target className="h-3 w-3 mr-1" />
            Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Head>
        <title>Current Affairs - UPSC Exam Preparation</title>
        <meta
          name="description"
          content="Stay updated with curated current affairs for UPSC preparation. Daily briefs, subject-wise articles, practice MCQs, and mains pointers."
        />
        <meta
          name="keywords"
          content="UPSC current affairs, daily news, prelims MCQs, mains answers, GS papers, Indian polity, economy, environment"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Current Affairs</h1>
          <p className="text-muted-foreground">
            Stay updated with UPSC-focused current affairs. Curated articles with syllabus mapping, practice questions, and mains pointers.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="daily">Daily Brief</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Compilation</TabsTrigger>
            <TabsTrigger value="subject">Subject-wise</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            {isLoading ? (
              <div className="text-center py-12">Loading articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No articles found.</div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Compilations</CardTitle>
                <CardDescription>
                  Download subject-wise monthly compilations for systematic revision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {subjects.slice(1).map((subject) => (
                    <div key={subject} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{subject}</h3>
                      <p className="text-sm text-muted-foreground mb-3">December 2024</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-3 w-3 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subject" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.slice(1).map((subject) => (
                <Card key={subject} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{subject}</CardTitle>
                    <CardDescription>
                      {filteredArticles.length} articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Articles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
