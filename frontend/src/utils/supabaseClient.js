import { createClient } from "@supabase/supabase-js";

// Read from Vite env or fallback to process.env
const supabaseUrl = 
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env && (process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL)) ||
  "https://igpuggmoskurxzebyolq.supabase.co";

const supabaseAnonKey = 
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env && (process.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY)) ||
  "sb_publishable_OhS-9WD5Fvz-GvdKnohETg_9kvWWKYj";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
