const express = require('express');
const ctrl = require('../controllers/likesController');

const router = express.Router();

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *   get:
 *     summary: Get likes count for a post
 *     tags: [Likes]
 */
router.get('/:postId/likes', ctrl.getLikes);

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 */
router.post('/:postId/likes', ctrl.likePost);

module.exports = router;
