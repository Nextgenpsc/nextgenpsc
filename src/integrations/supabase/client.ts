// integrations/supabase/client.ts (or .js)
"use client"; // only if you plan to import into client components

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://pxilycwmsbejejzbeedd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aWx5Y3dtc2JlamVqemJlZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NDAzNjgsImV4cCI6MjA3MjExNjM2OH0.peUbF6gszfjraPsepLUlHARrld9F8PP63HUsarjGpvg";

// Check if running in the browser
const isBrowser = typeof window !== "undefined";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: isBrowser ? window.localStorage : undefined,
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
    },
  }
);
