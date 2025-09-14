const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const categoryRoutes = require('./categories');
const tagRoutes = require('./tags');
const likeRoutes = require('./likes');
const uploadRoutes = require('./upload');
const feedRoutes = require('./feeds');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 */
router.get('/', healthController.check.bind(healthController));

// API routes
router.use('/api/auth', authRoutes);
router.use('/api/posts', postRoutes);
router.use('/api', commentRoutes); // uses /:postId/comments and /admin/comments/:id
router.use('/api/categories', categoryRoutes);
router.use('/api/tags', tagRoutes);
router.use('/api/posts', likeRoutes); // uses /:postId/likes
router.use('/api/uploads', uploadRoutes);

// Feeds
router.use('/', feedRoutes);

module.exports = router;
