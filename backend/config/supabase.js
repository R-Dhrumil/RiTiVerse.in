import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://igpuggmoskurxzebyolq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OhS-9WD5Fvz-GvdKnohETg_9kvWWKYj';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Warning: Supabase URL or Key is missing from backend environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
