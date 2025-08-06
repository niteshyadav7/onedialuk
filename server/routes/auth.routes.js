const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth.middleware");

const {
  registerValidation,
  loginValidation,
  forgotValidation,
  handleValidation,
} = require("../validations/auth.validation");
const {
  register,
  login,
  forgotPassword,
} = require("../controllers/auth.controller");

router.post("/register", registerValidation, handleValidation, register);
router.post("/login", loginValidation, handleValidation, login);
router.post(
  "/forget-password",
  forgotValidation,
  handleValidation,
  forgotPassword
);

// /api/auth/register//post
// /api/auth/login//post
// /api/categories/createCategory //post
// /api/categories/getAllCategories//get
// /api/categories/updateCategoryBySlug/:slug  //put
// /api/sub-category/createSubCategory //post
// /api/sub-category/getAllSubCategories //get
// /api/sub-category/updateSubCategoryBySlug //put

module.exports = router;
