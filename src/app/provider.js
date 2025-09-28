"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// If you want React Query devtools, uncomment below
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }) {
  // Create the QueryClient on the client side
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
