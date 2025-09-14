const { uploadToCloudinary } = require('../services/upload');

/**
 * PUBLIC_INTERFACE
 * uploadImage
 * Admin endpoint: upload an image to Cloudinary.
 */
async function uploadImage(req, res) {
  /** This is a public function. */
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'file is required' });
    }
    const result = await uploadToCloudinary(req.file.buffer);
    return res.status(201).json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error('uploadImage error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  uploadImage,
};
