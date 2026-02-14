import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation - make sure env variables exist
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables! Check your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
