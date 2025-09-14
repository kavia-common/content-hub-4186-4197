const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { upload } = require('../services/upload');
const ctrl = require('../controllers/uploadController');

const router = express.Router();

/**
 * @swagger
 * /api/uploads/image:
 *   post:
 *     summary: Upload an image (admin)
 *     tags: [Uploads]
 */
router.post('/image', requireAuth, requireAdmin, upload.single('file'), ctrl.uploadImage);

module.exports = router;
