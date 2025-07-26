const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
} = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
  forgotValidation,
  handleValidation,
} = require("../validations/auth.validation");

router.post("/register", registerValidation, handleValidation, register);
router.post("/login", loginValidation, handleValidation, login);
router.post(
  "/forget-password",
  forgotValidation,
  handleValidation,
  forgotPassword
);

module.exports = router;
