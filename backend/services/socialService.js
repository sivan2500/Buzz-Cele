
const axios = require('axios');

class SocialService {
  constructor() {
    // In a real app, these would be process.env.TWITTER_API_KEY, etc.
    this.simulatedMode = true;
  }

  /**
   * Broadcasts an article to all configured social platforms.
   * @param {Object} article - The article object (title, excerpt, imageUrl, id)
   */
  async broadcast(article) {
    // Use an environment variable for the frontend URL, fallback to localhost for testing
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const articleUrl = `${baseUrl}/#article-${article._id}`;
    const message = `${article.title}\n\n${article.excerpt}\n\nRead more: ${articleUrl} #BuzzCeleb #${article.category}`;

    console.log(`\n[SocialService] 🚀 Broadcasting article: "${article.title}"`);

    const results = await Promise.allSettled([
      this.postToTwitter(message, article.imageUrl),
      this.postToFacebook(message, article.imageUrl),
      this.postToLinkedIn(message, article.imageUrl, articleUrl),
      this.postToTelegram(message, article.imageUrl)
    ]);

    results.forEach(result => {
        if (result.status === 'rejected') {
            console.error('[SocialService] ❌ Failed to post:', result.reason);
        }
    });

    return results;
  }

  async postToTwitter(text, imageUrl) {
    if (this.simulatedMode) {
      console.log(`[Twitter] 🐦 Tweeting: ${text.substring(0, 50)}...`);
      return Promise.resolve({ id: 'mock-tweet-id', platform: 'twitter' });
    }
    // Implementation for Twitter V2 API would go here
  }

  async postToFacebook(text, imageUrl) {
    if (this.simulatedMode) {
      console.log(`[Facebook] 📘 Posting to Page: ${text.substring(0, 50)}...`);
      return Promise.resolve({ id: 'mock-fb-id', platform: 'facebook' });
    }
    // Implementation for Graph API would go here
  }

  async postToLinkedIn(text, imageUrl, url) {
    if (this.simulatedMode) {
      console.log(`[LinkedIn] 💼 Sharing update: ${text.substring(0, 50)}...`);
      return Promise.resolve({ id: 'mock-li-id', platform: 'linkedin' });
    }
    // Implementation for LinkedIn UGC API would go here
  }

  async postToTelegram(text, imageUrl) {
    if (this.simulatedMode) {
        console.log(`[Telegram] ✈️ Sending to Channel: ${text.substring(0, 50)}...`);
        return Promise.resolve({ id: 'mock-tg-id', platform: 'telegram' });
    }
    // Implementation for Telegram Bot API
  }
}

module.exports = new SocialService();
