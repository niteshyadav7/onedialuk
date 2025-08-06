const { body, validationResult } = require("express-validator");

const name = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required")
  .isString()
  .withMessage("Name must be a string");

const slug = body("slug")
  .optional()
  .trim()
  .isSlug()
  .withMessage("Slug must be URL-friendly");

const status = body("status")
  .optional()
  .trim()
  .isIn(["active", "inactive"])
  .withMessage("Status must be 'active' or 'inactive'");

const handleValidation = (req, res, next) => {
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
};

exports.validateCreateCategory = [name, slug, status, handleValidation];
exports.validateUpdateCategory = [name.optional(), slug, status, handleValidation];
