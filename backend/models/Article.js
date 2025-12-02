const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    
    // Updated: Reference to Author model
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    // Fallback/Display name if we don't want to populate every time
    authorName: { type: String }, 

    imageUrl: { type: String, required: true },
    content: { type: String }, 
    readTime: { type: String },
    isBreaking: { type: Boolean, default: false },
    
    // Updated: Reference to Series model
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
    
    tags: [{ type: String }],
    
    // Embedded Poll Structure (for Article-specific AI polls)
    aiPoll: {
       question: String,
       options: [{ label: String, votes: Number }],
       totalVotes: Number
    },

    affiliateProducts: [
        {
            name: String,
            price: String,
            imageUrl: String,
            link: String,
            brand: String
        }
    ]
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;