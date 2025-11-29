// zodiakku-api/src/config/supabaseClient.js

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL atau KEY belum di-set di .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
