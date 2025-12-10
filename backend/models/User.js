const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    avatarUrl: { type: String, default: '' },
    bookmarks: [{ type: String }],
    followedCategories: [{ type: String }],
    // Verification
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    // Payment
    isPremium: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String }
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;