const slugify = require("slugify");
const SubCategory = require("../models/subcategory.model");
// const SubCategory = require("../models/SubCategory");

// CREATE
exports.createSubCategory = async (req, res, next) => {
  try {
    const { name, slug, status, category } = req.body;
    const generatedSlug = slug || slugify(name, { lower: true });

    const exists = await SubCategory.findOne({ slug: generatedSlug });
    if (exists) {
      return res
        .status(409)
        .json({ error: "SubCategory with this slug already exists" });
    }

    const subCategory = new SubCategory({
      name,
      slug: generatedSlug,
      status: status || "active",
      category,
      createdBy: req.adminId,
    });

    const saved = await subCategory.save();
    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
exports.getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find({ isDeleted: false })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: subCategories });
  } catch (error) {
    next(error);
  }
};

// GET BY SLUG
exports.getSubCategoryBySlug = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findOne({
      slug: req.params.slug,
      isDeleted: false,
    }).populate("category", "name slug");

    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.json({ success: true, data: subCategory });
  } catch (error) {
    next(error);
  }
};

// UPDATE BY SLUG
exports.updateSubCategoryBySlug = async (req, res, next) => {
  try {
    const { name, status, category } = req.body;
    const slug = req.params.slug;

    let updateFields = {};

    if (name) {
      const newSlug = slugify(name, { lower: true });

      const conflict = await SubCategory.findOne({
        slug: newSlug,
        slug: { $ne: slug },
      });

      if (conflict) {
        return res.status(409).json({
          error: "Another subcategory with this name already exists",
        });
      }

      updateFields.name = name;
      updateFields.slug = newSlug;
    }

    if (status) updateFields.status = status;
    if (category) updateFields.category = category;

    const updated = await SubCategory.findOneAndUpdate(
      { slug, isDeleted: false },
      updateFields,
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "SubCategory not found or deleted" });
    }

    res.json({
      success: true,
      message: "SubCategory updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE BY SLUG (SOFT DELETE)
exports.deleteSubCategoryBySlug = async (req, res, next) => {
  try {
    const deleted = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deleted) {
      return res
        .status(404)
        .json({ error: "SubCategory not found or already deleted" });
    }

    res.json({ success: true, message: "SubCategory deleted", data: deleted });
  } catch (error) {
    next(error);
  }
};
