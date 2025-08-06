const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  updateSubCategoryBySlug,
  deleteSubCategoryBySlug,
  getSubCategoryBySlug,
  getAllSubCategories,
} = require("../controllers/subcategory.controller");

const { isAdminAuthenticated } = require("../middlewares/admin.middleware");
const {
  validateCreateSubCategory,
  validateUpdateSubCategory,
} = require("../validations/subcategory.validation");

router.get("/", getAllSubCategories);
router.get("/:slug", getSubCategoryBySlug);

router.post(
  "/",
  isAdminAuthenticated,
  validateCreateSubCategory,
  createSubCategory
);
router.put(
  "/:slug",
  isAdminAuthenticated,
  validateUpdateSubCategory,
  updateSubCategoryBySlug
);
router.delete("/:slug", isAdminAuthenticated, deleteSubCategoryBySlug);

module.exports = router;
