const slugify = require('slugify');
const { Post } = require('../models');

/**
 * PUBLIC_INTERFACE
 * listPosts
 * List posts with filters (status) and pagination.
 */
async function listPosts(req, res) {
  /** This is a public function. */
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
        .populate('author', 'email name')
        .populate('categories', 'name slug')
        .populate('tags', 'name slug')
        .lean(),
      Post.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit) || 1) });
  } catch (err) {
    console.error('listPosts error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * getPostBySlug
 * Public endpoint: get a published post by slug.
 */
async function getPostBySlug(req, res) {
  /** This is a public function. */
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, status: 'published' })
      .populate('author', 'email name')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .lean();
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * getPostAdmin
 * Admin endpoint: get any post by id.
 */
async function getPostAdmin(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate('author', 'email name')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .lean();
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * createPost
 * Admin endpoint: create a post (draft by default).
 */
async function createPost(req, res) {
  /** This is a public function. */
  try {
    const { title, content, excerpt, categories = [], tags = [], coverImageUrl } = req.body || {};
    if (!title || !content) return res.status(400).json({ message: 'title and content are required' });
    const slug = slugify(title, { lower: true, strict: true });
    const exists = await Post.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      author: req.user.id,
      categories,
      tags,
      coverImageUrl,
      status: 'draft',
    });
    return res.status(201).json({ post });
  } catch (err) {
    console.error('createPost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * updatePost
 * Admin endpoint: update a post.
 */
async function updatePost(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const input = req.body || {};
    if (input.title) {
      input.slug = slugify(input.title, { lower: true, strict: true });
    }
    const post = await Post.findByIdAndUpdate(id, input, { new: true });
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ post });
  } catch (err) {
    console.error('updatePost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * publishPost
 * Admin endpoint: publish a post, set publishedAt.
 */
async function publishPost(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { status: 'published', publishedAt: new Date() },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ post });
  } catch (err) {
    console.error('publishPost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * unpublishPost
 * Admin endpoint: revert to draft.
 */
async function unpublishPost(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { status: 'draft', publishedAt: null },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ post });
  } catch (err) {
    console.error('unpublishPost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * deletePost
 * Admin endpoint: delete a post.
 */
async function deletePost(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('deletePost error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  listPosts,
  getPostBySlug,
  getPostAdmin,
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  deletePost,
};
