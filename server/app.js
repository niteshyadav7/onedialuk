const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subcategory.routes");
const blogRoutes = require("./routes/blog.routes");
// const blogRoutes = require("./routes/blog.routes");
// const subCategoryRoutes = require("./routes/subcategory.routes");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");

//setup .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sub-category", subCategoryRoutes);
app.use("/api/blogs", blogRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
