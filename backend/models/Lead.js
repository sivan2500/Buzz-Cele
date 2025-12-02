const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['story', 'seo', 'sponsor'], 
      required: true 
    },
    source: { type: String, required: true }, // e.g., 'Google Trends', 'Twitter', 'GSC'
    score: { type: Number, default: 0 }, // 0-100 Viral Score
    estimatedTraffic: { type: String },
    
    // Status Workflow
    status: { 
      type: String, 
      enum: ['new', 'claimed', 'drafted', 'published', 'rejected'], 
      default: 'new' 
    },
    assignedEditor: { type: String },

    // Evidence & Data
    evidence: [
      {
        source: String,
        url: String,
        snippet: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    metrics: {
      impressions: Number,
      clicks: Number,
      trendVelocity: String // 'High', 'Medium', 'Low'
    },

    // AI Generated Content Recipe
    contentRecipe: {
      suggestedTitle: String,
      metaDescription: String,
      keywords: [String],
      articleOutline: String,
      videoScript: String, // Veo script
      sponsorMatches: [
        {
          company: String,
          relevance: String,
          contact: String
        }
      ]
    },

    // Provenance / Audit
    provenance: [
      {
        action: String, // 'harvested', 'ai_generated', 'approved'
        user: String, // 'System' or Admin Name
        timestamp: { type: Date, default: Date.now },
        details: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;