const Blog = require("../models/blog.model");

exports.createBlog = async (req, res, next) => {
  try {
    const { title, slug, content, image, category, status } = req.body;
    const blog = new Blog({
      title,
      slug,
      content,
      image,
      category,
      status,
      createdBy: req.adminId,
    });
    const saved = await blog.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const categories = await Blog.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// exports.getAllBlogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find({ deletedAt: null })
//       .populate("category")
//       .populate("createdBy", "fullName");
//     res.json({ success: true, data: blogs });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, deletedAt: null })
      .populate("category")
      .populate("createdBy", "fullName");
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

exports.updateBlogBySlug = async (req, res, next) => {
  try {
    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug, deletedAt: null },
      req.body,
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

exports.deleteBlogBySlug = async (req, res, next) => {
  try {
    const deleted = await Blog.findOneAndUpdate(
      { slug: req.params.slug, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    res.json({ success: true, message: "Blog soft-deleted", data: deleted });
  } catch (error) {
    next(error);
  }
};
