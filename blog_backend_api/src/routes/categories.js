const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const ctrl = require('../controllers/categoriesController');

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: List categories
 *     tags: [Categories]
 */
router.get('/', ctrl.listCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create category (admin)
 *     tags: [Categories]
 */
router.post('/', requireAuth, requireAdmin, ctrl.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update category (admin)
 *     tags: [Categories]
 */
router.put('/:id', requireAuth, requireAdmin, ctrl.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category (admin)
 *     tags: [Categories]
 */
router.delete('/:id', requireAuth, requireAdmin, ctrl.deleteCategory);

module.exports = router;
