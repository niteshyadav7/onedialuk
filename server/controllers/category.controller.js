const Category = require("../models/category.model");
const slugify = require("slugify");

// CREATE
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, status } = req.body;
    const generatedSlug = slug || slugify(name, { lower: true, strict: true });

    const exists = await Category.findOne({ slug: generatedSlug });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Category with this slug already exists" });
    }

    const category = new Category({
      name,
      slug: generatedSlug,
      status: status || "active",
      createdBy: req.adminId,
    });

    const saved = await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// GET BY SLUG
exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug, isDeleted: false });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// UPDATE BY SLUG
exports.updateCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name, status } = req.body;

    let updatedFields = {};
    if (name) {
      const newSlug = slugify(name, { lower: true, strict: true });
      const conflict = await Category.findOne({
        slug: newSlug,
        isDeleted: false,
      });
      if (conflict && conflict.slug !== slug) {
        return res
          .status(409)
          .json({ message: "Another category with this name already exists" });
      }
      updatedFields.name = name;
      updatedFields.slug = newSlug;
    }

    if (status) {
      updatedFields.status = status;
    }

    const updated = await Category.findOneAndUpdate(
      { slug, isDeleted: false },
      updatedFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found or deleted" });
    }

    res.json({ success: true, message: "Category updated", data: updated });
  } catch (error) {
    next(error);
  }
};

// SOFT DELETE
exports.deleteCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const deleted = await Category.findOneAndUpdate(
      { slug, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Category not found or already deleted" });
    }

    res.json({
      success: true,
      message: "Category soft-deleted",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
