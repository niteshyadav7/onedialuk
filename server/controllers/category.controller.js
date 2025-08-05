// const Category = require("../category.model");

const Category = require("../models/category.model");

exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, status } = req.body;
    const category = new Category({
      name,
      slug,
      status,
      createdBy: req.adminId, // from auth middleware
    });
    const saved = await category.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

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

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isDeleted: false,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// exports.getCategoryById = async (req, res, next) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) return res.status(404).json({ error: "Category not found" });
//     res.json({ success: true, data: category });
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateCategoryBySlug = async (req, res, next) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Category not found or deleted" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// exports.updateCategory = async (req, res, next) => {
//   try {
//     const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json({ success: true, data: updated });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteCategoryBySlug = async (req, res, next) => {
  try {
    const deleted = await Category.findOneAndUpdate(
      { slug: req.params.slug, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Category not found or already deleted" });
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

// exports.deleteCategory = async (req, res, next) => {
//   try {
//     const deleted = await Category.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: true },
//       { new: true }
//     );
//     res.json({
//       success: true,
//       message: "Category soft-deleted",
//       data: deleted,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
