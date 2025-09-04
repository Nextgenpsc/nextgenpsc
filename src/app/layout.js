import "./globals.css";
import {Header} from "../components/Header";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "UPSC Prep Academy",
  description:
    "Comprehensive UPSC preparation platform with test series and study materials",
  url: "https://upsc-prep-academy.lovable.app",
  educationalUse: "UPSC Preparation",
  offers: {
    "@type": "Course",
    name: "UPSC Civil Services Preparation",
    description:
      "Complete preparation course for UPSC Civil Services Examination",
  },
};

export const metadata = {
  title: "UPSC Prep Academy - Complete Civil Services Exam Preparation",
  description:
    "Master the UPSC Civil Services Examination with our comprehensive test series and study materials. Join thousands of aspirants preparing for IAS, IPS, IFS and other civil services.",
  keywords:
    "UPSC preparation, civil services exam, IAS preparation, UPSC coaching online, test series, study materials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
            <Header />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
