const { GoogleGenAI, Type } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

const generateArticleFromLead = async (lead) => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const prompt = `
    You are a senior entertainment editor for "BuzzCelebDaily", a high-end celebrity news site.
    
    I will provide you with a "Lead" (a trending topic or headline).
    Your task is to write a full, engaging, viral-worthy article based on this lead.
    
    Lead Title: "${lead.title}"
    Source: "${lead.source}"
    
    Requirements:
    1.  **Title**: Create a catchy, click-worthy title (better than the lead title).
    2.  **Excerpt**: A short, punchy summary (max 2 sentences).
    3.  **Content**: The full article body in HTML format. Use <h2> for subheadings, <p> for paragraphs. Make it at least 300 words. Tone should be gossipy but professional.
    4.  **Category**: Choose the best category from: [Entertainment, Movies, Music, Royals, Reality TV, Fashion, Lifestyle, Sports, Wealth, Tech].
    5.  **SEO**: Generate a meta description and a list of 5 SEO keywords.
    
    Output MUST be valid JSON matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
            readTime: { type: Type.STRING, description: "e.g. '4 min read'" },
            seo: {
                type: Type.OBJECT,
                properties: {
                    metaDescription: { type: Type.STRING },
                    keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
          },
          required: ["title", "excerpt", "content", "category", "readTime", "seo"]
        }
      }
    });

    if (response.data) {
        // Just in case the SDK returns it differently in node vs browser, mostly it's response.text() or response.text
        // The SDK usage guide says response.text
        return JSON.parse(response.text);
    }
    return JSON.parse(response.text);

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate article content.");
  }
};

module.exports = { generateArticleFromLead };