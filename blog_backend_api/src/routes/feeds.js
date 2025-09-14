const express = require('express');
const ctrl = require('../controllers/feedsController');

const router = express.Router();

/**
 * @swagger
 * /sitemap.xml:
 *   get:
 *     summary: Sitemap XML
 *     tags: [SEO]
 */
router.get('/sitemap.xml', ctrl.sitemap);

/**
 * @swagger
 * /rss.xml:
 *   get:
 *     summary: RSS feed
 *     tags: [SEO]
 */
router.get('/rss.xml', ctrl.rss);

module.exports = router;
