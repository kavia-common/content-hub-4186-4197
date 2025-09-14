const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const ctrl = require('../controllers/postsController');

const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: List posts
 *     tags: [Posts]
 */
router.get('/', ctrl.listPosts);

/**
 * @swagger
 * /api/posts/slug/{slug}:
 *   get:
 *     summary: Get a published post by slug
 *     tags: [Posts]
 */
router.get('/slug/:slug', ctrl.getPostBySlug);

/**
 * @swagger
 * /api/posts/admin/{id}:
 *   get:
 *     summary: Get post by id (admin)
 *     tags: [Posts]
 */
router.get('/admin/:id', requireAuth, requireAdmin, ctrl.getPostAdmin);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a post (admin)
 *     tags: [Posts]
 */
router.post('/', requireAuth, requireAdmin, ctrl.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post (admin)
 *     tags: [Posts]
 */
router.put('/:id', requireAuth, requireAdmin, ctrl.updatePost);

/**
 * @swagger
 * /api/posts/{id}/publish:
 *   post:
 *     summary: Publish a post (admin)
 *     tags: [Posts]
 */
router.post('/:id/publish', requireAuth, requireAdmin, ctrl.publishPost);

/**
 * @swagger
 * /api/posts/{id}/unpublish:
 *   post:
 *     summary: Unpublish a post (admin)
 *     tags: [Posts]
 */
router.post('/:id/unpublish', requireAuth, requireAdmin, ctrl.unpublishPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post (admin)
 *     tags: [Posts]
 */
router.delete('/:id', requireAuth, requireAdmin, ctrl.deletePost);

module.exports = router;
