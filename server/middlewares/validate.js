// middlewares/validate.js
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  // Check if errors exist
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));

    return res.status(422).json({
      success: false,
      errors: extractedErrors,
    });
  }

  next();
};

module.exports = validate;
