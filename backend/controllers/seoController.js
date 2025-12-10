const Article = require('../models/Article');
const Author = require('../models/Author');
const Series = require('../models/Series');

const getSitemap = async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const articles = await Article.find({}, 'updatedAt _id title');
    const authors = await Author.find({}, 'updatedAt name');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Routes
    ['', '#live', '#about', '#contact'].forEach(route => {
      xml += `<url><loc>${baseUrl}/${route}</loc><changefreq>daily</changefreq></url>`;
    });

    // Dynamic Routes
    articles.forEach(article => {
      xml += `<url><loc>${baseUrl}/#article-${article._id}</loc><lastmod>${new Date(article.updatedAt).toISOString()}</lastmod></url>`;
    });

    authors.forEach(author => {
        xml += `<url><loc>${baseUrl}/#author-${encodeURIComponent(author.name)}</loc></url>`;
    });

    xml += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
};

const getRobotsTxt = (req, res) => {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`);
};

module.exports = { getSitemap, getRobotsTxt };