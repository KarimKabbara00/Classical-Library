import OpenAI from "openai";
import { createClient } from '@supabase/supabase-js';
import * as dotenv from "dotenv";

// import .env module and grab kv pairs
dotenv.config();

// chatGPT
const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Supabase
const supabaseURL = process.env.SUPABASE_DB;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseURL, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey);

export { openAI, supabase, supabaseAdmin };
