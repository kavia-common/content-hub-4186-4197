const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const ctrl = require('../controllers/tagsController');

const router = express.Router();

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: List tags
 *     tags: [Tags]
 */
router.get('/', ctrl.listTags);

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create tag (admin)
 *     tags: [Tags]
 */
router.post('/', requireAuth, requireAdmin, ctrl.createTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: Update tag (admin)
 *     tags: [Tags]
 */
router.put('/:id', requireAuth, requireAdmin, ctrl.updateTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete tag (admin)
 *     tags: [Tags]
 */
router.delete('/:id', requireAuth, requireAdmin, ctrl.deleteTag);

module.exports = router;
