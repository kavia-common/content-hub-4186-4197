const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ['admin', 'author', 'reader'], default: 'admin' },
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, index: true },
  slug: { type: String, unique: true, required: true, index: true },
  description: { type: String },
}, { timestamps: true });

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, index: true },
  slug: { type: String, unique: true, required: true, index: true },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImageUrl: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  publishedAt: { type: Date },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String },
  content: { type: String, required: true },
  status: { type: String, enum: ['approved', 'pending', 'spam'], default: 'approved' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true });

const likeSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  ip: { type: String, index: true },
  userAgent: { type: String },
}, { timestamps: true });
likeSchema.index({ post: 1, ip: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

module.exports = {
  User,
  Category,
  Tag,
  Post,
  Comment,
  Like,
};
