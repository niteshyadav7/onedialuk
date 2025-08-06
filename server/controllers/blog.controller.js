// const Blog = require("../models/Blog");
const slugify = require("slugify");
const Blog = require("../models/blog.model");

// CREATE BLOG
exports.createBlog = async (req, res, next) => {
  try {
    const {
      title,
      content,
      category,
      subCategory,
      status,
      image,
      slug: customSlug,
    } = req.body;

    const slug = customSlug || slugify(title, { lower: true, strict: true });

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    const newBlog = await Blog.create({
      title,
      slug,
      content,
      category,
      subCategory: subCategory || null,
      image,
      createdBy: req.adminId,
      status: status || "active",
    });

    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    next(error);
  }
};

// GET ALL
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isDeleted: false })
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("createdBy", "fullName");

    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

// GET BY SLUG

exports.getBlogBySlug = async (req, res, next) => {
  try {
    console.log(req.params.slug);

    const blog = await Blog.findOne({
      slug: req.params.slug,
      isDeleted: false,
    })
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("createdBy", "fullName");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ success: true, data: blog });
    // res.send("Done!")
  } catch (error) {
    next(error);
  }
};

// UPDATE BY SLUG
exports.updateBlogBySlug = async (req, res, next) => {
  try {
    const { title, content, category, subCategory, status, image } = req.body;

    const updateFields = {
      ...(title && { title }),
      ...(title && { slug: slugify(title, { lower: true, strict: true }) }),
      ...(content && { content }),
      ...(image && { image }),
      ...(category && { category }),
      ...(subCategory !== undefined && { subCategory }),
      ...(status && { status }),
    };

    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isDeleted: false },
      updateFields,
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Blog not found or already deleted" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE BLOG (soft delete)
exports.deleteBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!blog) {
      return res
        .status(404)
        .json({ error: "Blog not found or already deleted" });
    }

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
