
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Keep bcrypt for password hashing
const crypto = require('crypto');
const supabase = require('../config/supabase'); // Import Supabase client
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
    // SUPABASE: Fetch user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    // Note: In a full Supabase migration, you might switch to supabase.auth.signInWithPassword()
    // But here we maintain your existing auth flow with the new DB.
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Verification Check
      if (!user.is_verified) {
          return res.status(401).json({ message: 'Please verify your email address before logging in.' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        isAdmin: user.is_admin,
        isPremium: user.is_premium,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, avatarUrl } = req.body;

  try {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate random verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          avatar_url: avatarUrl,
          verification_token: verificationToken,
          is_verified: false,
          is_admin: false,
          is_premium: false
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    if (newUser) {
      // Send Verification Email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verifyUrl = `${frontendUrl}/#verify/${verificationToken}`;

      const message = `
        <h1>Welcome to BuzzCelebDaily!</h1>
        <p>Please confirm your email address to unlock full access to the gossip.</p>
        <a href="${verifyUrl}" style="background-color: #db2777; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Verify Email</a>
        <p>Or paste this link: ${verifyUrl}</p>
      `;

      await sendEmail({
        email: newUser.email,
        subject: 'BuzzCelebDaily - Verify your email',
        message
      });

      res.status(201).json({
        message: 'Registration successful! Please check your email to verify your account.',
        email: newUser.email
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify User Email
// @route   GET /api/auth/verify/:token
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('verification_token', req.params.token)
            .single();

        if (error || !user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({ is_verified: true, verification_token: null })
            .eq('id', user.id);

        if (updateError) throw updateError;

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
    // req.user is set by authMiddleware (needs update as well, see below)
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', req.user.id)
        .single();

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
        bookmarks: user.bookmarks || [],
        followedCategories: user.followed_categories || [],
        isAdmin: user.is_admin,
        isPremium: user.is_premium
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authUser, registerUser, verifyEmail, getUserProfile };
