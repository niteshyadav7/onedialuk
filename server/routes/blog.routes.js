const express = require("express");
const { validateBlog } = require("../validations/blog.validation");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
  deleteBlogBySlug,
} = require("../controllers/blog.controller");
const { isAdminAuthenticated } = require("../middlewares/admin.middleware");

router.post("/", isAdminAuthenticated, validateBlog, createBlog);
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.put("/:slug", isAdminAuthenticated, validateBlog, updateBlogBySlug);
router.delete("/:slug", isAdminAuthenticated, deleteBlogBySlug);

module.exports = router;
