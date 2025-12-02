import { GoogleGenAI, Type } from "@google/genai";
import { Article, Poll } from "../types";

// Note: In a real app, strict error handling for missing API keys is essential.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateGossipArticles = async (topic?: string): Promise<Article[]> => {
  if (!apiKey) {
    console.warn("No API Key provided, returning empty list.");
    return [];
  }

  try {
    const prompt = topic 
      ? `Generate 4 realistic but fictional, high-drama celebrity gossip news headlines and short excerpts specifically about "${topic}". They should sound like they belong on a high-end entertainment news site.`
      : "Generate 4 realistic but fictional, high-drama celebrity gossip news headlines and short excerpts. They should sound like they belong on a high-end entertainment news site.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              category: { type: Type.STRING },
              author: { type: Type.STRING },
              readTime: { type: Type.STRING },
            },
            required: ["title", "excerpt", "category", "author", "readTime"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || '[]');
    
    // Enrich with IDs and Placeholders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any, index: number) => ({
      ...item,
      id: `generated-${Date.now()}-${index}`,
      publishedAt: new Date().toISOString(),
      imageUrl: `https://picsum.photos/800/600?random=${index + 10}`,
      isBreaking: index === 0, // Make the first generated one breaking
      tags: topic ? [topic, 'AI Exclusive'] : ['AI Exclusive', 'Rumor'],
    }));

  } catch (error) {
    console.error("Failed to generate articles:", error);
    return [];
  }
};

export const generateArticlePoll = async (article: Article): Promise<Poll | null> => {
    if (!apiKey) {
        console.warn("No API Key provided, returning null poll.");
        return null;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a fun, engaging, and slightly provocative poll question with 3-4 options based on this celebrity news story. 
            Title: "${article.title}"
            Excerpt: "${article.excerpt}"
            
            The poll should ask for the reader's opinion on the drama/situation.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    label: { type: Type.STRING },
                                    votes: { type: Type.INTEGER, description: "A random starting vote count between 10 and 100" }
                                },
                                required: ["label", "votes"]
                            }
                        }
                    },
                    required: ["question", "options"]
                }
            }
        });

        const data = JSON.parse(response.text || '{}');
        
        if (!data.question || !data.options) return null;

        // Calculate total votes
        const totalVotes = data.options.reduce((sum: number, opt: any) => sum + (opt.votes || 0), 0);
        
        // Add IDs to options
        const optionsWithIds = data.options.map((opt: any, idx: number) => ({
            ...opt,
            id: `opt-${Date.now()}-${idx}`,
            articleId: article.id
        }));

        return {
            id: `poll-${article.id}`,
            question: data.question,
            options: optionsWithIds,
            totalVotes: totalVotes
        };

    } catch (error) {
        console.error("Failed to generate poll:", error);
        return null;
    }
}