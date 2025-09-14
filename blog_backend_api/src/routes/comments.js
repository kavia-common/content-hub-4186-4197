const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const ctrl = require('../controllers/commentsController');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: List approved comments for post
 *     tags: [Comments]
 */
router.get('/:postId/comments', ctrl.listComments);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 */
router.post('/:postId/comments', ctrl.createComment);

/**
 * @swagger
 * /api/admin/posts/{postId}/comments:
 *   get:
 *     summary: Admin list comments for post
 *     tags: [Comments]
 */
router.get('/admin/:postId/comments', requireAuth, requireAdmin, ctrl.adminListComments);

/**
 * @swagger
 * /api/admin/comments/{id}:
 *   put:
 *     summary: Update comment (admin)
 *     tags: [Comments]
 */
router.put('/admin/comments/:id', requireAuth, requireAdmin, ctrl.updateComment);

/**
 * @swagger
 * /api/admin/comments/{id}:
 *   delete:
 *     summary: Delete comment (admin)
 *     tags: [Comments]
 */
router.delete('/admin/comments/:id', requireAuth, requireAdmin, ctrl.deleteComment);

module.exports = router;
