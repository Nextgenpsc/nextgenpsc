// app/current-affairs/[id]/page.js
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Target,
  Calendar,
  MapPin,
} from "lucide-react";
import currentAffairsData from "@/data/currentAffairsData.json";

// Incremental Static Regeneration (refresh every 6 hours)
export const revalidate = 21600;

// Prebuild known paths (static SSG); safe for JSON-backed content
export async function generateStaticParams() {
  return (currentAffairsData || []).map((item) => ({ id: String(item.id) }));
}

// Build per-page metadata for SEO
export async function generateMetadata({ params }) {
  const article = (currentAffairsData || []).find(
    (a) => String(a.id) === String(params.id)
  );

  const baseUrl = "https://www.nextgenpsc.com";
  const url = `${baseUrl}/current-affairs/${encodeURIComponent(params.id)}`;

  if (!article) {
    return {
      title: "Current Affairs – Not Found | NextGenPSC",
      description: "The requested current affairs article could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const titleBase =
    article?.details?.topic ||
    article?.title ||
    "UPSC Current Affairs Article | NextGenPSC";

  const description =
    article?.summary?.slice(0, 160) ||
    "UPSC-focused current affairs with background, strategic significance, challenges, and UPSC relevance.";

  const image = article?.details?.image || article?.image || `${baseUrl}/og-image.jpg`;

  return {
    title: `${titleBase} | NextGenPSC`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${titleBase} | NextGenPSC`,
      description,
      url,
      siteName: "NextGenPSC",
      type: "article",
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: titleBase }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleBase} | NextGenPSC`,
      description,
      images: [image],
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
}

// JSON-LD (Article + Breadcrumb)
function JsonLd({ article, url }) {
  const title =
    article?.details?.topic || article?.title || "UPSC Current Affairs";
  const description =
    article?.summary ||
    "UPSC-focused current affairs with background and exam relevance.";
  const image = article?.details?.image || article?.image;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nextgenpsc.com/" },
      { "@type": "ListItem", position: 2, name: "Current Affairs", item: "https://www.nextgenpsc.com/current-affairs" },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    image: image ? [image] : undefined,
    author: { "@type": "Organization", name: "NextGenPSC" },
    publisher: {
      "@type": "Organization",
      name: "NextGenPSC",
      logo: { "@type": "ImageObject", url: "https://www.nextgenpsc.com/icon-512x512.png" },
    },
    // Optional dates if you have them in JSON
    datePublished: article?.publishedAt || undefined,
    dateModified: article?.updatedAt || article?.publishedAt || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}

export default function Page({ params }) {
  const article = (currentAffairsData || []).find(
    (a) => String(a.id) === String(params.id)
  );

  if (!article) return notFound();

  const { details } = article;
  const pageUrl = `https://www.nextgenpsc.com/current-affairs/${encodeURIComponent(
    params.id
  )}`;

  return (
    <>
      <JsonLd article={article} url={pageUrl} />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/current-affairs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Current Affairs
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {details?.topic || article?.title}
          </h1>

          {details?.image && (
            <div className="relative w-full h-64 mb-6">
              <Image
                src={details.image}
                alt={details.topic || "Current affairs image"}
                fill
                className="object-cover rounded-lg"
                sizes="100vw"
                unoptimized // avoids next.config domain config for external images
                priority
              />
            </div>
          )}
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <section className="lg:col-span-2 space-y-6">
            {/* Background */}
            {details?.background && (
              <Card as="article" aria-label="Background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details.background.summary && (
                    <p className="text-muted-foreground">
                      {details.background.summary}
                    </p>
                  )}
                  <div className="grid gap-2">
                    {details.background.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Location:</strong> {details.background.location}
                        </span>
                      </div>
                    )}
                    {details.background.related_conflict && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">
                          <strong>Related Event:</strong>{" "}
                          {details.background.related_conflict}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Exercise Details */}
            {details?.exercise_details && (
              <Card as="section" aria-label="Exercise Details">
                <CardHeader>
                  <CardTitle>
                    {details.exercise_details.name} – Exercise Details
                  </CardTitle>
                  {details.exercise_details.scope && (
                    <CardDescription>
                      {details.exercise_details.scope}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.isArray(details.exercise_details.objectives) && (
                    <div>
                      <h3 className="font-semibold mb-2">Objectives</h3>
                      <ul className="space-y-1">
                        {details.exercise_details.objectives.map(
                          (objective, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              • {objective}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {details.exercise_details.participants && (
                    <div>
                      <h3 className="font-semibold mb-2">Participants</h3>
                      <p className="text-sm text-muted-foreground">
                        {details.exercise_details.participants}
                      </p>
                    </div>
                  )}
                  {Array.isArray(details.exercise_details.expected_outcomes) && (
                    <div>
                      <h3 className="font-semibold mb-2">Expected Outcomes</h3>
                      <ul className="space-y-1">
                        {details.exercise_details.expected_outcomes.map(
                          (outcome, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              • {outcome}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sudarshan Chakra */}
            {details?.sudarshan_chakra && (
              <Card as="section" aria-label="Sudarshan Chakra Program">
                <CardHeader>
                  <CardTitle>Sudarshan Chakra Program</CardTitle>
                  {details.sudarshan_chakra.description && (
                    <CardDescription>
                      {details.sudarshan_chakra.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {details.sudarshan_chakra.timeline && (
                    <div>
                      <h3 className="font-semibold mb-2">Timeline</h3>
                      <div className="grid gap-2">
                        {details.sudarshan_chakra.timeline.phase1 && (
                          <p className="text-sm">
                            <strong>Phase 1:</strong>{" "}
                            {details.sudarshan_chakra.timeline.phase1}
                          </p>
                        )}
                        {details.sudarshan_chakra.timeline.phase2 && (
                          <p className="text-sm">
                            <strong>Phase 2:</strong>{" "}
                            {details.sudarshan_chakra.timeline.phase2}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {Array.isArray(details.sudarshan_chakra.components) && (
                    <div>
                      <h3 className="font-semibold mb-2">Components</h3>
                      <ul className="space-y-1">
                        {details.sudarshan_chakra.components.map(
                          (component, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              • {component}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {details.sudarshan_chakra.related_projects && (
                    <div>
                      <h3 className="font-semibold mb-2">Related Projects</h3>
                      <div className="space-y-2">
                        {Object.entries(
                          details.sudarshan_chakra.related_projects
                        ).map(([project, desc]) => (
                          <div key={project}>
                            <strong className="text-sm">
                              {project.replace(/_/g, " ")}:
                            </strong>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(details.sudarshan_chakra.recent_milestones) && (
                    <div>
                      <h3 className="font-semibold mb-2">Recent Milestones</h3>
                      <ul className="space-y-1">
                        {details.sudarshan_chakra.recent_milestones.map(
                          (milestone, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              • {milestone}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Strategic Significance */}
            {Array.isArray(details?.strategic_significance) && (
              <Card as="section" aria-label="Strategic Significance">
                <CardHeader>
                  <CardTitle>Strategic Significance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.strategic_significance.map((point, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Challenges */}
            {Array.isArray(details?.challenges) && (
              <Card as="section" aria-label="Challenges">
                <CardHeader>
                  <CardTitle>Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.challenges.map((ch, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {ch}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Future Outlook */}
            {details?.future_outlook && (
              <Card as="section" aria-label="Future Outlook">
                <CardHeader>
                  <CardTitle>Future Outlook</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(details.future_outlook).map(([key, value]) => (
                    <div key={key}>
                      <strong className="text-sm capitalize">
                        {key.replace(/_/g, " ")}:
                      </strong>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* UPSC Relevance */}
            {details?.upsc_relevance && (
              <Card aria-label="UPSC Relevance">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    UPSC Relevance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {details.upsc_relevance.gs_paper2 && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        GS Paper 2
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {details.upsc_relevance.gs_paper2}
                      </p>
                    </div>
                  )}
                  {details.upsc_relevance.gs_paper3 && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        GS Paper 3
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {details.upsc_relevance.gs_paper3}
                      </p>
                    </div>
                  )}
                  {Array.isArray(details.upsc_relevance.essay_ethics) && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Essay & Ethics
                      </Badge>
                      <ul className="space-y-1">
                        {details.upsc_relevance.essay_ethics.map((t, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sample Questions */}
            {details?.sample_questions && (
              <Card aria-label="Sample Questions">
                <CardHeader>
                  <CardTitle>Sample Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {details.sample_questions.prelims && (
                    <div>
                      <h3 className="font-semibold mb-2">Prelims</h3>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">
                          {details.sample_questions.prelims.question}
                        </p>
                        <div className="space-y-1">
                          {details.sample_questions.prelims.options?.map(
                            (option, idx) => (
                              <p key={idx} className="text-xs text-muted-foreground">
                                {option}
                              </p>
                            )
                          )}
                        </div>
                        {Array.isArray(details.sample_questions.prelims.answer) && (
                          <p className="text-xs mt-2 font-medium">
                            Answer:{" "}
                            {details.sample_questions.prelims.answer
                              .map((a) => `Option ${a}`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {details.sample_questions.mains && (
                    <div>
                      <h3 className="font-semibold mb-2">Mains</h3>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">
                          {details.sample_questions.mains.question}
                        </p>
                        {details.sample_questions.mains.structured_answer && (
                          <div className="space-y-2 text-xs text-muted-foreground">
                            {details.sample_questions.mains.structured_answer.introduction && (
                              <p>
                                <strong>Introduction:</strong>{" "}
                                {details.sample_questions.mains.structured_answer.introduction}
                              </p>
                            )}
                            {details.sample_questions.mains.structured_answer.body && (
                              <div className="space-y-1">
                                <p>
                                  <strong>Body:</strong>
                                </p>
                                {Object.entries(
                                  details.sample_questions.mains.structured_answer.body
                                ).map(([k, v]) => (
                                  <p key={k} className="ml-2">
                                    • {v}
                                  </p>
                                ))}
                              </div>
                            )}
                            {details.sample_questions.mains.structured_answer.conclusion && (
                              <p>
                                <strong>Conclusion:</strong>{" "}
                                {details.sample_questions.mains.structured_answer.conclusion}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Sources */}
            {Array.isArray(details?.sources) && (
              <Card aria-label="Sources">
                <CardHeader>
                  <CardTitle>Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {details.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Source {idx + 1}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>

        {/* Bottom navigation / internal links help crawlability */}
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link href="/current-affairs" className="underline hover:text-primary">
            Current Affairs Home
          </Link>
          <Link href="/test-series" className="underline hover:text-primary">
            UPSC Mock Tests
          </Link>
          <Link href="/study-materials" className="underline hover:text-primary">
            Study Materials
          </Link>
        </div>
      </main>
    </>
  );
}
