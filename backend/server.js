const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const contentRoutes = require('./routes/contentRoutes');
const leadRoutes = require('./routes/leadRoutes'); // Import Lead Routes
const Subscriber = require('./models/Subscriber');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/leads', leadRoutes); // Mount Lead Routes

// Simple Newsletter Route
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        const exists = await Subscriber.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }
        await Subscriber.create({ email });
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/', (req, res) => {
  res.send('BuzzCelebDaily API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});