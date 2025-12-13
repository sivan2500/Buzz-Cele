
const Lead = require('../models/Lead');
const Article = require('../models/Article');
const TrendService = require('../services/trendService');
const AIService = require('../services/aiService');
const SocialService = require('../services/socialService');

// @desc    Get all leads
// @route   GET /api/leads
const getLeads = async (req, res) => {
  try {
    const { status, type, minScore } = req.query;
    let query = {};
    
    if (status) query.status = status;
    if (type) query.type = type;
    if (minScore) query.score = { $gte: Number(minScore) };

    const leads = await Lead.find(query).sort({ score: -1, createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Harvest new leads (Using TrendService) - HTTP Endpoint
// @route   POST /api/leads/harvest
const harvestLeads = async (req, res) => {
  try {
    const result = await runHarvestCycle();
    res.status(201).json({ 
        message: `Harvest complete. Added ${result.added} new leads.`, 
        leads: result.leads 
    });
  } catch (error) {
    console.error("Harvest Error:", error);
    res.status(500).json({ message: "Failed to harvest leads: " + error.message });
  }
};

// Internal function for CRON jobs (No req/res)
const runHarvestCycle = async () => {
    console.log('🚜 Starting Harvest Cycle...');
    // 1. Fetch aggregated trends
    const freshTrends = await TrendService.aggregateTrends();
    const createdLeads = [];
    let count = 0;

    // 2. Save to database
    for (const trend of freshTrends) {
      const exists = await Lead.findOne({ title: trend.title });
      if (!exists) {
        const lead = await Lead.create({
          ...trend,
          provenance: [{ 
              action: 'harvested', 
              user: 'System_Cron', 
              details: `Detected via ${trend.source}` 
          }]
        });
        createdLeads.push(lead);
        count++;
      }
    }
    console.log(`✅ Harvest Complete. ${count} new leads found.`);
    return { added: count, leads: createdLeads };
};

// @desc    Generate Content Recipe (Mocking Gemini)
// @route   POST /api/leads/:id/generate
const generateContentRecipe = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    const mockRecipe = {
      suggestedTitle: `BREAKING: ${lead.title} - What You Need to Know`,
      metaDescription: `Everything we know about ${lead.title}. Exclusive details inside.`,
      keywords: [lead.title.split(' ')[0], 'Viral', 'News', '2025'],
      articleOutline: `1. Introduction\n2. The Viral Moment\n3. Fan Reactions\n4. What Experts Say`,
      videoScript: `[Scene: Fast paced montage]\nVoiceover: "Did you see this? ${lead.title} is taking over the internet..."`,
      sponsorMatches: [
        { company: 'FashionNova', relevance: 'High', contact: 'partners@fashionnova.com' }
      ]
    };

    lead.contentRecipe = mockRecipe;
    lead.provenance.push({ action: 'ai_generated', user: req.user ? req.user.name : 'Admin', details: 'Generated content recipe' });
    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead status (Claim/Reject)
// @route   PUT /api/leads/:id/status
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    lead.status = status;
    if (status === 'claimed' && req.user) {
      lead.assignedEditor = req.user.name;
    }
    
    lead.provenance.push({ 
        action: 'status_change', 
        user: req.user ? req.user.name : 'Admin', 
        details: `Changed status to ${status}` 
    });

    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auto-Post Lead as Article using AI
// @route   POST /api/leads/:id/autopost
const autoPostLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        if (lead.status === 'published') {
            return res.status(400).json({ message: 'Lead already published' });
        }

        // 1. Generate Article Content via Gemini
        const generatedContent = await AIService.generateArticleFromLead(lead);

        // 2. Create Article in DB
        const newArticle = await Article.create({
            title: generatedContent.title,
            excerpt: generatedContent.excerpt,
            content: generatedContent.content,
            category: generatedContent.category || 'Celebrity',
            authorName: 'BuzzCeleb Staff', 
            imageUrl: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
            readTime: generatedContent.readTime,
            isBreaking: lead.score > 80,
            tags: generatedContent.seo.keywords,
            metaDescription: generatedContent.seo.metaDescription,
            seoKeywords: generatedContent.seo.keywords,
            views: 0
        });

        // 3. Update Lead Status
        lead.status = 'published';
        lead.provenance.push({ 
            action: 'auto_posted', 
            user: req.user ? req.user.name : 'System', 
            details: `Converted to Article ID: ${newArticle._id}` 
        });
        await lead.save();

        // 4. Trigger Social Broadcast (Async)
        SocialService.broadcast(newArticle).catch(err => console.error("Social Broadcast Error:", err));

        res.status(201).json({ 
            message: 'Article auto-posted successfully', 
            article: newArticle 
        });

    } catch (error) {
        console.error("Auto-Post Error:", error);
        res.status(500).json({ message: "Failed to auto-post: " + error.message });
    }
};

module.exports = {
  getLeads,
  getLeadById,
  harvestLeads,
  runHarvestCycle,
  generateContentRecipe,
  updateLeadStatus,
  autoPostLead
};
