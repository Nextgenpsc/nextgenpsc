// NO "use client"
import SubjectTest from "../../../pages/SubjectTest";
import { getSubjectById } from "@/data/upscSubjects";

export async function generateMetadata({ params }) {
  const subject = getSubjectById(params.subjectId);
  if (!subject) {
    return {
      title: "Subject Not Found | UPSC Prep",
      description: "The requested subject could not be found.",
    };
  }
  return {
    title: `${subject.name} Mock Tests - Chapter-wise & Full Tests`,
    description: `Practice ${subject.name} with chapter-wise tests, full mock tests, and personalized weak section analysis for UPSC preparation.`,
    keywords: [`${subject.name}`, "UPSC", "mock test", "chapter test", "practice questions", params.subjectId],
  };
}

export default function Page({ params }) {
  // Pass the param down; the client can use it without useParams()
  return <SubjectTest subjectId={params.subjectId} />;
}
