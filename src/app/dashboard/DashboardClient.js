// app/dashboard/DashboardClient.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Target,
  Trophy,
  Calendar,
  TrendingUp,
  Clock,
  MessageCircle,
  Newspaper,
} from "lucide-react";

import { EmailSettings } from "@/components/EmailSettings";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardClient() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // Test attempts
  const { data: testAttempts = [] } = useQuery({
    queryKey: ["test-attempts", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("test_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // User progress
  const { data: userProgress = [] } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Stats
  const totalTests = testAttempts.length;
  const avgScore = totalTests
    ? Math.round(
        (testAttempts.reduce((sum, t) => sum + ((t.score || 0) / (t.total_questions || 1)) * 100, 0) / totalTests) * 10
      ) / 10
    : 0;

  const recentProgressDays =
    userProgress.filter((p) => {
      const last = new Date(p.last_accessed_at || p.updated_at || p.created_at || Date.now());
      const daysDiff = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 30;
    }).length || 0;

  const subjectProgress =
    userProgress.reduce((acc, progress) => {
      const key = progress.subject_id || "General";
      if (!acc[key]) acc[key] = { total: 0, completed: 0 };
      acc[key].total += 1;
      if (progress.is_completed) acc[key].completed += 1;
      return acc;
    }, {}) || {};

  const totalStudyTime = testAttempts.reduce((sum, t) => sum + (t.time_taken || 0), 0);
  const studyHours = Math.floor(totalStudyTime / 3600);
  const studyMinutes = Math.floor((totalStudyTime % 3600) / 60);

  // JSON-LD (kept for rich result hints)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "UPSC Prep Academy Dashboard",
    description: "Personal dashboard for UPSC Civil Services Examination preparation tracking",
    educationalUse: "UPSC Preparation Tracking",
    audience: { "@type": "EducationalAudience", educationalRole: "Student" },
    url: "https://www.nextgenpsc.com/dashboard",
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background pt-16">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Track your UPSC preparation progress</p>
              </div>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/test-series">
                    <Target className="h-4 w-4 mr-2" />
                    Take Test
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/study-materials">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Materials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTests}</div>
                <p className="text-xs text-muted-foreground">
                  {testAttempts.filter((t) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(t.completed_at) > weekAgo;
                  }).length || 0}{" "}
                  from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgScore}%</div>
                <p className="text-xs text-muted-foreground">
                  {totalTests > 1 ? "Based on test attempts" : "Take more tests for trends"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentProgressDays} topics</div>
                <p className="text-xs text-muted-foreground">Studied this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studyHours}h {studyMinutes}m
                </div>
                <p className="text-xs text-muted-foreground">Total test time</p>
              </CardContent>
            </Card>
          </section>

          {/* Progress Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Subject-wise Progress
                </CardTitle>
                <CardDescription>Your completion rate across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(subjectProgress).length > 0 ? (
                  Object.entries(subjectProgress).map(([subjectId, progress]) => {
                    const percentage = Math.round((progress.completed / progress.total) * 100);
                    const subjectName =
                      subjectId === "polity"
                        ? "Indian Polity"
                        : subjectId.charAt(0).toUpperCase() + subjectId.slice(1);
                    return (
                      <div key={subjectId} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{subjectName}</span>
                          <span>{isNaN(percentage) ? 0 : percentage}%</span>
                        </div>
                        <Progress value={isNaN(percentage) ? 0 : percentage} className="h-2" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Start studying to see your progress here
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest study sessions and test attempts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testAttempts && testAttempts.length > 0 ? (
                  testAttempts.slice(0, 3).map((attempt, index) => {
                    const score = Math.round(
                      ((attempt.score || 0) / (attempt.total_questions || 1)) * 100
                    );
                    const timeAgo = new Date(attempt.completed_at);
                    const now = new Date();
                    const diffHours = Math.floor(
                      (now.getTime() - timeAgo.getTime()) / (1000 * 60 * 60)
                    );
                    const timeText =
                      diffHours < 1
                        ? "Just now"
                        : diffHours < 24
                        ? `${diffHours}h ago`
                        : `${Math.floor(diffHours / 24)}d ago`;

                    return (
                      <div key={attempt.id || index} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Completed {attempt.test_name}</p>
                          <p className="text-xs text-muted-foreground">
                            Score: {isNaN(score) ? 0 : score}% • {timeText}
                          </p>
                        </div>
                        {index === 0 && <Badge variant="secondary">Latest</Badge>}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No recent activity. Take a test to get started!
                  </p>
                )}

                {userProgress && userProgress.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Study Progress Updated</p>
                      <p className="text-xs text-muted-foreground">
                        {userProgress.filter((p) => p.is_completed).length} topics completed
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Email Settings */}
          <section className="mb-8">
            <EmailSettings />
          </section>

          {/* Quick Actions */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Continue your preparation journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Button asChild className="h-auto p-6 flex-col gap-2">
                    <Link href="/test-series">
                      <Target className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Take Mock Test</div>
                        <div className="text-xs opacity-90">Full-length practice tests</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-6 flex-col gap-2">
                    <Link href="/study-materials">
                      <BookOpen className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Study Materials</div>
                        <div className="text-xs opacity-90">Comprehensive notes & PDFs</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-6 flex-col gap-2">
                    <Link href="/chat">
                      <MessageCircle className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">AI Chat Support</div>
                        <div className="text-xs opacity-90">Get instant help & guidance</div>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-6 flex-col gap-2">
                    <Link href="/current-affairs">
                      <Newspaper className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">Current Affairs</div>
                        <div className="text-xs opacity-90">Latest news & analysis</div>
                      </div>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-6 flex-col gap-2">
                    <TrendingUp className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold">Performance Analysis</div>
                      <div className="text-xs opacity-90">Detailed insights & trends</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}
