const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.registerValidation = [
  body("fullName").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone")
    .matches(/^[0-9]{10}$/)
    .withMessage("Valid 10-digit phone number is required"),
  body("countryCode"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.forgotValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
];

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
