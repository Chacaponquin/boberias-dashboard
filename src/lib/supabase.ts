import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY } from "./env";

const supabaseUrl = "https://vpkgbllibugkedncqicr.supabase.co";
const supabaseKey = SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
