import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase credentials are missing from .env");
}

// We use the service_role key here ONLY on the server to bypass RLS for admin uploads
export const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '');
