
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      // Verification Check
      if (!user.isVerified) {
          return res.status(401).json({ message: 'Please verify your email address before logging in.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, avatarUrl } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate random verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      name,
      email,
      password,
      avatarUrl,
      verificationToken,
      isVerified: false // Explicitly set to false
    });

    if (user) {
      // Send Verification Email
      // Use FRONTEND_URL if set, otherwise default to Vite dev port (5173) for proper link generation
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verifyUrl = `${frontendUrl}/#verify/${verificationToken}`;

      const message = `
        <h1>Welcome to BuzzCelebDaily!</h1>
        <p>Please confirm your email address to unlock full access to the gossip.</p>
        <a href="${verifyUrl}" style="background-color: #db2777; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Verify Email</a>
        <p>Or paste this link: ${verifyUrl}</p>
      `;

      await sendEmail({
        email: user.email,
        subject: 'BuzzCelebDaily - Verify your email',
        message
      });

      res.status(201).json({
        message: 'Registration successful! Please check your email to verify your account.',
        email: user.email
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify User Email
// @route   GET /api/auth/verify/:token
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bookmarks: user.bookmarks,
        followedCategories: user.followedCategories,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authUser, registerUser, verifyEmail, getUserProfile };
    