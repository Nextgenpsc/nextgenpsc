// integrations/supabase/client.js (or .ts)
import { createClient } from "@supabase/supabase-js";
// import type { Database } from './types'; // if using TS

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pxilycwmsbejejzbeedd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."; // move to env in prod!

// only grab localStorage when window exists
const browserStorage = typeof window !== "undefined" ? window.localStorage : undefined;

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    // include storage only on client
    ...(browserStorage ? { storage: browserStorage } : {}),
    persistSession: true,
    autoRefreshToken: true,
  },
});
