const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogBySlug,
  getAllBlogs,
  deleteBlogBySlug,
  updateBlogBySlug,
} = require("../controllers/blog.controller");


const {
  validateCreateBlog,
  validateUpdateBlog,
} = require("../validations/blog.validation");

const { isAdminAuthenticated } = require("../middlewares/admin.middleware");

// Public Routes
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Admin-Protected Routes
router.post("/", isAdminAuthenticated, validateCreateBlog, createBlog);
router.put(
  "/:slug",
  isAdminAuthenticated,
  validateUpdateBlog,
  updateBlogBySlug
);
router.delete("/:slug", isAdminAuthenticated, deleteBlogBySlug);

module.exports = router;
