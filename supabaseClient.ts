
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qxqctubmmjckznyfsnvz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cWN0dWJtbWpja3pueWZzbnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTA5MzgsImV4cCI6MjA4MDk2NjkzOH0.sN39nv8iIkZxm9HDlNt5tKmtmYvA7JCKHTvbEKWkWXo';

export const supabase = createClient(supabaseUrl, supabaseKey);
