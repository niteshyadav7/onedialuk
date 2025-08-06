const { body, validationResult } = require("express-validator");

const commonRules = {
  title: body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  slug: body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be URL-friendly (slug format)"),

  content: body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),

  image: body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  category: body("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be a valid Mongo ID"),

  subCategory: body("subCategory")
    .optional()
    .isMongoId()
    .withMessage("SubCategory must be a valid Mongo ID"),

  status: body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),
};

exports.validateCreateBlog = [
  commonRules.title.exists(),
  commonRules.slug,
  commonRules.content.exists(),
  commonRules.image,
  commonRules.category.exists().withMessage("Category is required"),
  commonRules.subCategory,
  commonRules.status,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }
    next();
  },
];

exports.validateUpdateBlog = [
  commonRules.title,
  commonRules.slug,
  commonRules.content,
  commonRules.image,
  commonRules.category,
  commonRules.subCategory,
  commonRules.status,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }
    next();
  },
];
