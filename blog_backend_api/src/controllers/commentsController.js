const { Comment, Post } = require('../models');

/**
 * PUBLIC_INTERFACE
 * listComments
 * List comments for a post (public - approved only).
 */
async function listComments(req, res) {
  /** This is a public function. */
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId, status: 'approved' }).sort({ createdAt: -1 }).lean();
    return res.json({ items: comments });
  } catch (err) {
    console.error('listComments error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * createComment
 * Public endpoint to create a comment (auto-approved by default).
 */
async function createComment(req, res) {
  /** This is a public function. */
  try {
    const { postId } = req.params;
    const { authorName, authorEmail, content, parent } = req.body || {};
    if (!authorName || !content) return res.status(400).json({ message: 'authorName and content are required' });
    const comment = await Comment.create({ post: postId, authorName, authorEmail, content, parent, status: 'approved' });
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
    return res.status(201).json({ comment });
  } catch (err) {
    console.error('createComment error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * adminListComments
 * Admin endpoint: list all comments (any status).
 */
async function adminListComments(req, res) {
  /** This is a public function. */
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).lean();
    return res.json({ items: comments });
  } catch (err) {
    console.error('adminListComments error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * updateComment
 * Admin endpoint: update comment (status/content).
 */
async function updateComment(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const input = req.body || {};
    const comment = await Comment.findByIdAndUpdate(id, input, { new: true });
    if (!comment) return res.status(404).json({ message: 'Not found' });
    return res.json({ comment });
  } catch (err) {
    console.error('updateComment error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * deleteComment
 * Admin endpoint: delete comment and decrement count.
 */
async function deleteComment(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    await Post.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });
    return res.json({ success: true });
  } catch (err) {
    console.error('deleteComment error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  listComments,
  createComment,
  adminListComments,
  updateComment,
  deleteComment,
};
