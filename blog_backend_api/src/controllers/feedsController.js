const { Post } = require('../models');

/**
 * PUBLIC_INTERFACE
 * sitemap
 * Generates an XML sitemap of published posts.
 */
async function sitemap(req, res) {
  /** This is a public function. */
  try {
    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
    const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).select('slug updatedAt').lean();
    const urls = posts.map(p => `
  <url>
    <loc>${siteUrl}/posts/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt || p.publishedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
    res.header('Content-Type', 'application/xml');
    return res.send(xml);
  } catch (err) {
    console.error('sitemap error', err);
    return res.status(500).send('Internal Server Error');
  }
}

/**
 * PUBLIC_INTERFACE
 * rss
 * Generates an RSS feed of latest published posts.
 */
async function rss(req, res) {
  /** This is a public function. */
  try {
    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
    const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).limit(50).lean();
    const items = posts.map(p => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${siteUrl}/posts/${p.slug}</link>
    <guid isPermaLink="true">${siteUrl}/posts/${p.slug}</guid>
    <pubDate>${new Date(p.publishedAt || p.createdAt).toUTCString()}</pubDate>
    <description><![CDATA[${p.excerpt || (p.content || '').slice(0, 200)}]]></description>
  </item>`).join('');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog RSS</title>
    <link>${siteUrl}</link>
    <description>Latest posts</description>
    ${items}
  </channel>
</rss>`;
    res.header('Content-Type', 'application/rss+xml');
    return res.send(xml);
  } catch (err) {
    console.error('rss error', err);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  sitemap,
  rss,
};
