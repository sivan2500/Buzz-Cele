const Lead = require('../models/Lead');

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

// @desc    Harvest new leads (Mocking AI/API Scanning)
// @route   POST /api/leads/harvest
const harvestLeads = async (req, res) => {
  try {
    // In a real app, this would call Google Trends API, Twitter API, GSC API
    // Here we simulate finding 3 new hot leads
    
    const mockTrends = [
      {
        title: "Zendaya's Vintage Versace Moment",
        type: 'story',
        source: 'Twitter Trending',
        score: 98,
        estimatedTraffic: '250k+',
        metrics: { impressions: 1500000, clicks: 45000, trendVelocity: 'High' },
        evidence: [{ source: 'Twitter', url: '#', snippet: 'Trending #1 Worldwide: Zendaya stuns in archive Versace.' }]
      },
      {
        title: "Best Retinol Serums 2025",
        type: 'seo',
        source: 'Google Search Console',
        score: 85,
        estimatedTraffic: '45k/mo',
        metrics: { impressions: 80000, clicks: 1200, trendVelocity: 'Medium' },
        evidence: [{ source: 'GSC', url: '#', snippet: 'Keyword "best retinol" up 200% WoW.' }]
      },
      {
        title: "Rolex vs. Patek: Investment Guide",
        type: 'sponsor',
        source: 'Market Watch',
        score: 92,
        estimatedTraffic: 'High Value ($$$)',
        metrics: { impressions: 30000, clicks: 5000, trendVelocity: 'Stable' },
        evidence: [{ source: 'NewsAPI', url: '#', snippet: 'Luxury watch market seeing resurgence.' }]
      }
    ];

    const createdLeads = [];

    for (const trend of mockTrends) {
      const lead = await Lead.create({
        ...trend,
        provenance: [{ action: 'harvested', user: 'AI_Scanner_Bot', details: 'Detected via API harvest' }]
      });
      createdLeads.push(lead);
    }

    res.status(201).json({ message: `Harvested ${createdLeads.length} new leads`, leads: createdLeads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate Content Recipe (Mocking Gemini)
// @route   POST /api/leads/:id/generate
const generateContentRecipe = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    // Mock AI Generation delay
    // In real app: const recipe = await geminiService.createRecipe(lead.title);
    
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

module.exports = {
  getLeads,
  getLeadById,
  harvestLeads,
  generateContentRecipe,
  updateLeadStatus
};