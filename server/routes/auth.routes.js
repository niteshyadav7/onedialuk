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
// router.get("/test", protect, (req, res) => {
//   console.log(req.body)
//   res.send("Done from protected");

// });
// router.get("/testX", (req, res) => {
//   res.send("Done");
// });
// router.get("/testXY", authorize, (req, res) => {
//   res.send("Done from the authorization");
// });

module.exports = router;
