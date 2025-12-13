
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://qxqctubmmjckznyfsnvz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cWN0dWJtbWpja3pueWZzbnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTA5MzgsImV4cCI6MjA4MDk2NjkzOH0.sN39nv8iIkZxm9HDlNt5tKmtmYvA7JCKHTvbEKWkWXo';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const seedData = async () => {
  try {
    console.log('🌱 Starting Supabase Seeder...');

    // 1. Clean existing data (Optional - be careful in production!)
    // Note: Due to foreign key constraints, order matters
    // Commenting out delete for safety with anon key interaction
    // await supabase.from('comments').delete().neq('id', 0);
    // await supabase.from('articles').delete().neq('id', 0);
    // await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Check if user exists first to avoid duplicate key error
    const { data: existingUser } = await supabase.from('users').select('id').eq('email', 'admin@buzzcelebdaily.com').single();

    if (!existingUser) {
        const { data: user, error: userError } = await supabase
        .from('users')
        .insert([
            {
            email: 'admin@buzzcelebdaily.com',
            password: hashedPassword,
            name: 'Super Admin',
            is_admin: true,
            is_premium: true,
            is_verified: true,
            avatar_url: 'https://ui-avatars.com/api/?name=Super+Admin&background=db2777&color=fff'
            }
        ])
        .select()
        .single();

        if (userError) throw new Error(`User creation failed: ${userError.message}`);
        console.log(`✅ Admin user created: ${user.email}`);
    } else {
        console.log('ℹ️ Admin user already exists');
    }

    // 3. Create Articles
    const articles = [
      {
        title: "The Midnight Gala: Who Wore What on the Red Carpet",
        excerpt: "From shimmering sequins to bold avant-garde statements, here is the definitive ranking of last night's best dressed stars.",
        content: "<p>The red carpet was set on fire last night...</p>",
        category: "Lifestyle",
        author_name: "Elena Fisher",
        image_url: "https://picsum.photos/800/600?random=1",
        read_time: "5 min read",
        is_breaking: true,
        views: 1250,
        created_at: new Date().toISOString()
      },
      {
        title: "Pop Icon Teases New Album Dropping Next Friday",
        excerpt: "After a three-year hiatus, the chart-topping sensation posted a cryptic image that has fans analyzing every pixel.",
        content: "<p>Rumors have been swirling for months...</p>",
        category: "Music",
        author_name: "Marc Johnson",
        image_url: "https://picsum.photos/800/600?random=2",
        read_time: "3 min read",
        is_breaking: false,
        views: 890,
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        title: "Royal Protocol Broken? The Handshake That Shocked the World",
        excerpt: "Sources close to the palace say tensions are high following the unexpected departure from tradition during the garden party.",
        content: "<p>It was a moment that will be analyzed for years...</p>",
        category: "Royals",
        author_name: "Sarah Jenkins",
        image_url: "https://picsum.photos/800/600?random=3",
        read_time: "8 min read",
        is_breaking: false,
        views: 3400,
        created_at: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    const { data: createdArticles, error: articleError } = await supabase
      .from('articles')
      .insert(articles)
      .select();

    if (articleError) console.log(`ℹ️ Article creation skipped or failed (might already exist): ${articleError.message}`);
    else console.log(`✅ Created ${createdArticles.length} articles`);

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
