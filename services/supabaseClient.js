import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config/supabase.js";

export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export function isSupabaseConfigured() {
  return !SUPABASE_URL.includes("YOUR_PROJECT_ID") && !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY");
}
