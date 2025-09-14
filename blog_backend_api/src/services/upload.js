const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

/**
 * Memory storage for multer to stream directly to Cloudinary.
 */
const upload = multer({ storage: multer.memoryStorage() });

/**
 * PUBLIC_INTERFACE
 * uploadToCloudinary
 * Upload a buffer to Cloudinary and return the uploaded result.
 */
async function uploadToCloudinary(buffer, folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'blog-uploads') {
  /** This is a public function. */
  return new Promise((resolve, reject) => {
    const cldStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(cldStream);
  });
}

module.exports = {
  upload,
  uploadToCloudinary,
};
