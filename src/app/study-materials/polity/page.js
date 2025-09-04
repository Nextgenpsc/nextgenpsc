// NO "use client"
import { Suspense } from "react";
import PolityApp from "../../../components/study-material/polity/PolityApp";

export const metadata = {
  title: "Indian Polity & Governance - UPSC Study Materials",
  description:
    "Comprehensive notes on Indian Constitution, governance systems, and political processes for UPSC Civil Services preparation.",
  keywords:
    "Indian polity, UPSC governance, constitution notes, political science UPSC, civil services polity",
};

export default function Page() {
  return (
  <Suspense fallback={<div />}>
     <PolityApp />
    </Suspense>
  );
}
