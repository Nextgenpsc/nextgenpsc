"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { upscSubjects } from "@/data/upscSubjects";
import { Search, BookOpen, Download, Eye } from "lucide-react";

export default function StudyMaterialsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleViewNotes = (subjectId) => {
    if (subjectId === "polity") {
      router.push("/study-materials/polity");
    } else {
      alert(`${subjectId} notes coming soon!`);
    }
  };

  const filteredSubjects = upscSubjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "UPSC Study Materials",
    description:
      "Comprehensive study materials for UPSC Civil Services Examination",
    educationalUse: "UPSC Preparation",
    learningResourceType: "Study Materials",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "Student",
    },
  };

  return (
    <>
      {/* Optional JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background pt-16">
        <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Study Materials
                </h1>
                <p className="text-muted-foreground mt-2">
                  Comprehensive notes and resources for UPSC preparation
                </p>
              </div>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {subject.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{subject.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {subject.totalTopics} Topics
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="default"
                        className="w-full"
                        size="sm"
                        onClick={() => handleViewNotes(subject.id)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Notes
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No subjects found matching your search.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
