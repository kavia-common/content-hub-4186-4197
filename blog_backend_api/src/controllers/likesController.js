const { Like, Post } = require('../models');

/**
 * PUBLIC_INTERFACE
 * likePost
 * Public endpoint: like/upvote a post (rate-limited by IP).
 */
async function likePost(req, res) {
  /** This is a public function. */
  try {
    const { postId } = req.params;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '0.0.0.0';
    const ua = req.headers['user-agent'] || '';
    try {
      await Like.create({ post: postId, ip, userAgent: ua });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
    } catch (e) {
      // duplicate likes are ignored
    }
    const post = await Post.findById(postId).lean();
    return res.json({ likesCount: post?.likesCount || 0 });
  } catch (err) {
    console.error('likePost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * getLikes
 * Public endpoint: fetch current like count.
 */
async function getLikes(req, res) {
  /** This is a public function. */
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).lean();
    return res.json({ likesCount: post?.likesCount || 0 });
  } catch (err) {
    console.error('getLikes error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  likePost,
  getLikes,
};
