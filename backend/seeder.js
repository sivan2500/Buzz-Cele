
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Article = require('./models/Article');
const Author = require('./models/Author');
const Series = require('./models/Series');
const Story = require('./models/Story');
const Poll = require('./models/Poll');
const { Sighting, CalendarEvent, FashionBattle } = require('./models/Widget');
const { RadioStation, TVChannel } = require('./models/Media');
const { TrendingTopic, TrendingCategory } = require('./models/Trend');
const SponsoredContent = require('./models/Ad');
const Lead = require('./models/Lead');
const Comment = require('./models/Comment');
const Subscriber = require('./models/Subscriber');
const Analytics = require('./models/Analytics');

dotenv.config();
connectDB();

// --- DATA IMPORT LOGIC ---

const importData = async () => {
  try {
    console.log('⚠️  Destroying existing data...');
    await User.deleteMany();
    await Article.deleteMany();
    await Author.deleteMany();
    await Series.deleteMany();
    await Story.deleteMany();
    await Poll.deleteMany();
    await Sighting.deleteMany();
    await CalendarEvent.deleteMany();
    await FashionBattle.deleteMany();
    await RadioStation.deleteMany();
    await TVChannel.deleteMany();
    await TrendingTopic.deleteMany();
    await TrendingCategory.deleteMany();
    await SponsoredContent.deleteMany();
    await Lead.deleteMany();
    await Comment.deleteMany();
    await Subscriber.deleteMany();
    await Analytics.deleteMany();

    console.log('🌱 Seeding Super Admin...');
    const adminUser = await User.create({
        name: 'Super Admin',
        email: process.env.ADMIN_EMAIL || 'admin@buzzcelebdaily.com',
        password: process.env.ADMIN_PASSWORD || 'admin123', // CHANGE THIS IN PROD ENV
        isAdmin: true,
        isVerified: true,
        isPremium: true,
        locale: 'en',
        avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=db2777&color=fff'
    });

    console.log('🌱 Seeding Core Content...');
    
    // Insert 1 Mock Author for fallback
    const author = await Author.create({
        name: "BuzzCeleb Staff",
        role: "Editorial Team",
        bio: "Breaking news and exclusive scoops from the heart of Hollywood.",
        avatarUrl: "https://buzzcelebdaily.com/logo.png",
        social: { twitter: "@BuzzCeleb" }
    });

    // Create initial analytics for Dashboard graphs
    console.log('🌱 Seeding Analytics History...');
    const analyticsToInsert = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        analyticsToInsert.push({
            date: date,
            metrics: {
                pageViews: Math.floor(Math.random() * 8000) + 2000,
                uniqueVisitors: Math.floor(Math.random() * 4000) + 1000,
                pwaInstalls: Math.floor(Math.random() * 20),
                revenue: Math.floor(Math.random() * 300) + 50
            },
            deviceBreakdown: { mobile: 70, desktop: 25, tablet: 5 },
            pwaSource: { android: 60, ios: 40, desktop: 0 }
        });
    }
    await Analytics.insertMany(analyticsToInsert);

    console.log('✅ Data Imported Successfully!');
    console.log(`🔑 Admin Login: ${adminUser.email}`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Article.deleteMany();
        // ... delete others
        console.log('🔥 Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
