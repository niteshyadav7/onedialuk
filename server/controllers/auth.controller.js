const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
// const { validationResult } = require("express-validator");
const sendMail = require("../utils/sendMail");

exports.register = async (req, res) => {
  const { fullName, email, password, role, phone, countryCode } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) return res.status(400).json({ message: "Email already exists" });

    user = await User.create({
      fullName,
      email,
      password,
      role,
      phone,
      countryCode,
    });
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        countryCode,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty())
  //   return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = generateToken(user);

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const html = `<h3>Reset your password</h3><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;

    await sendMail(email, "Password Reset", html);
    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
