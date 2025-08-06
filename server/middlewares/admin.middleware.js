const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

exports.isAdminAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Admin.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    req.adminId = user._id;
    next();
  } catch (err) {
    console.error("Admin Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
