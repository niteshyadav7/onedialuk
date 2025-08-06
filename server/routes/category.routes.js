const express = require("express");
const router = express.Router();

const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("../validations/category.validation");

const {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug,
} = require("../controllers/category.controller");
const { isAdminAuthenticated } = require("../middlewares/admin.middleware");

// Public
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);

// Protected (Admin only)
router.post("/", isAdminAuthenticated, validateCreateCategory, createCategory);
router.put(
  "/:slug",
  isAdminAuthenticated,
  validateUpdateCategory,
  updateCategoryBySlug
);
router.delete("/:slug", isAdminAuthenticated, deleteCategoryBySlug);

module.exports = router;
