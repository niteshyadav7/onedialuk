

const { body, validationResult } = require("express-validator");

exports.validateCreateSubCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be URL-friendly"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

exports.validateUpdateSubCategory = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("category").optional().notEmpty().withMessage("Category cannot be empty"),
  body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be URL-friendly"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
