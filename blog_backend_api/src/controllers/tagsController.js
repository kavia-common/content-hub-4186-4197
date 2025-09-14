const slugify = require('slugify');
const { Tag } = require('../models');

/**
 * PUBLIC_INTERFACE
 * listTags
 * Public endpoint: list tags.
 */
async function listTags(req, res) {
  /** This is a public function. */
  try {
    const items = await Tag.find().sort({ name: 1 }).lean();
    return res.json({ items });
  } catch (err) {
    console.error('listTags error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * createTag
 * Admin endpoint: create tag.
 */
async function createTag(req, res) {
  /** This is a public function. */
  try {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ message: 'name is required' });
    const slug = slugify(name, { lower: true, strict: true });
    const exists = await Tag.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });
    const tag = await Tag.create({ name, slug });
    return res.status(201).json({ tag });
  } catch (err) {
    console.error('createTag error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * updateTag
 * Admin endpoint: update tag.
 */
async function updateTag(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const input = req.body || {};
    if (input.name) input.slug = slugify(input.name, { lower: true, strict: true });
    const tag = await Tag.findByIdAndUpdate(id, input, { new: true });
    if (!tag) return res.status(404).json({ message: 'Not found' });
    return res.json({ tag });
  } catch (err) {
    console.error('updateTag error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * deleteTag
 * Admin endpoint: delete tag.
 */
async function deleteTag(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('deleteTag error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  listTags,
  createTag,
  updateTag,
  deleteTag,
};
