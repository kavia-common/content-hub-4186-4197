const slugify = require('slugify');
const { Category } = require('../models');

/**
 * PUBLIC_INTERFACE
 * listCategories
 * Public endpoint: list categories.
 */
async function listCategories(req, res) {
  /** This is a public function. */
  try {
    const items = await Category.find().sort({ name: 1 }).lean();
    return res.json({ items });
  } catch (err) {
    console.error('listCategories error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * createCategory
 * Admin endpoint: create category.
 */
async function createCategory(req, res) {
  /** This is a public function. */
  try {
    const { name, description } = req.body || {};
    if (!name) return res.status(400).json({ message: 'name is required' });
    const slug = slugify(name, { lower: true, strict: true });
    const exists = await Category.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Slug already exists' });
    const category = await Category.create({ name, slug, description });
    return res.status(201).json({ category });
  } catch (err) {
    console.error('createCategory error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * updateCategory
 * Admin endpoint: update category.
 */
async function updateCategory(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const input = req.body || {};
    if (input.name) input.slug = slugify(input.name, { lower: true, strict: true });
    const category = await Category.findByIdAndUpdate(id, input, { new: true });
    if (!category) return res.status(404).json({ message: 'Not found' });
    return res.json({ category });
  } catch (err) {
    console.error('updateCategory error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PUBLIC_INTERFACE
 * deleteCategory
 * Admin endpoint: delete category.
 */
async function deleteCategory(req, res) {
  /** This is a public function. */
  try {
    const { id } = req.params;
    const cat = await Category.findByIdAndDelete(id);
    if (!cat) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error('deleteCategory error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
