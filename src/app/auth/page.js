// NO "use client"
import { Suspense } from "react";
import AuthPage from "../../pages/AuthPage"

export default function Page() {
  return (
  <Suspense fallback={<div />}>
     <AuthPage />
    </Suspense>
  );
}
