// supabase.ts
// imports the createClient function from Supabase SDK library, is used to create instance of the Supabase client
import { createClient } from '@supabase/supabase-js';
//method in Astro for obtaining environment variables
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://wgrakcuiuaovmgvquymi.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncmFrY3VpdWFvdm1ndnF1eW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjMzNjgsImV4cCI6MjA3MDQ5OTM2OH0.5nHvawMGyA__8j8FtAw2mPkzFZT3saFeipYeZvHmW14';
// creates instance of supabase client using URL and key, createClient(supabaseUrl, supabaseKey) — calls function that initializes the client, export — makes this client available for import in other files - API routes (/api/register.js) or components (Header.astro, dashboard.astro)
export const supabase = createClient(supabaseUrl, supabaseKey);