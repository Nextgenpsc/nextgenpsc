// NO "use client"
import { Suspense } from "react";
import PolityTestPage from "../../pages/PolityTestPage"


export default function Page() {
  return (
  <Suspense fallback={<div />}>
     <PolityTestPage />
    </Suspense>
  );
}
