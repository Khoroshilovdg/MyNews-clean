// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://wgrakcuiuaovmgvquymi.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncmFrY3VpdWFvdm1ndnF1eW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjMzNjgsImV4cCI6MjA3MDQ5OTM2OH0.5nHvawMGyA__8j8FtAw2mPkzFZT3saFeipYeZvHmW14';

export const supabase = createClient(supabaseUrl, supabaseKey);