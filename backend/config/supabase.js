
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Warn if keys are missing but don't crash immediately to allow build processes
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials missing in .env. Ensure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
}

// Initialize Supabase client
// We use the service_role key for the backend to bypass RLS policies when necessary.
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;
