
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

// Use environment variables or fallback to provided credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://qxqctubmmjckznyfsnvz.supabase.co';
// Note: Usually the backend uses the SERVICE_KEY for admin privileges, 
// but we will use the provided ANON_KEY for integration purposes. 
// RLS policies on Supabase should be configured to allow necessary public access.
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cWN0dWJtbWpja3pueWZzbnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTA5MzgsImV4cCI6MjA4MDk2NjkzOH0.sN39nv8iIkZxm9HDlNt5tKmtmYvA7JCKHTvbEKWkWXo';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials missing. Ensure SUPABASE_URL and SUPABASE_SERVICE_KEY are set.');
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;
