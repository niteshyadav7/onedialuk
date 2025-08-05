const express = require("express");
const router = express.Router();

const { validateCategory } = require("../validations/category.validation");
const { isAdminAuthenticated } = require("../middlewares/admin.middleware");
const {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug,
} = require("../controllers/category.controller");

router.post("/", isAdminAuthenticated, validateCategory, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryBySlug);
router.put(
  "/:id",
  isAdminAuthenticated,
  validateCategory,
  updateCategoryBySlug
);
router.delete("/:id", isAdminAuthenticated, deleteCategoryBySlug);
module.exports = router;
