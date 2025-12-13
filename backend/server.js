
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const contentRoutes = require('./routes/contentRoutes');
const leadRoutes = require('./routes/leadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const seoRoutes = require('./routes/seoRoutes');
const { handleWebhook } = require('./controllers/paymentController'); 
const Subscriber = require('./models/Subscriber');
const { runHarvestCycle } = require('./controllers/leadController');
const SocialService = require('./services/socialService');

dotenv.config();

// Connect to MongoDB only if URI is present
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log("⚠️ MONGO_URI not found in .env. Skipping MongoDB connection (Hybrid mode or Supabase only).");
}

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// 3. Compression
app.use(compression());

// 4. CORS Configuration (Strict for production)
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Lock this down in prod
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Webhook must be raw (before JSON parser)
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/', seoRoutes);

app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        // Fallback or Supabase implementation needed if Mongo is off
        if (Subscriber && process.env.MONGO_URI) {
            const exists = await Subscriber.findOne({ email });
            if (exists) return res.status(400).json({ message: 'Email already subscribed' });
            await Subscriber.create({ email });
            res.status(201).json({ message: 'Subscribed successfully' });
        } else {
             // Mock success if no DB for subscribers yet
             res.status(201).json({ message: 'Subscribed successfully (Mock)' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/', (req, res) => {
  res.send('BuzzCelebDaily API is running...');
});

// --- SCHEDULED TASKS ---
cron.schedule('0 */4 * * *', async () => {
    console.log('⏰ Running scheduled harvest cycle...');
    try {
        if(process.env.MONGO_URI) {
            await runHarvestCycle();
        } else {
            console.log('Skipping harvest cycle (No MongoDB configured)');
        }
    } catch (err) {
        console.error('Scheduled harvest failed:', err);
        SocialService.sendAdminAlert(`❌ *CRON Job Failed*\n\n${err.message}`);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const mode = process.env.NODE_ENV || 'development';
  console.log(`Server running in ${mode} mode on port ${PORT}`);
  SocialService.sendAdminAlert(`🚀 *Server Started*\n\nEnvironment: ${mode}\nPort: ${PORT}`);
});
