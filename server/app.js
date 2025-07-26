const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const morgan = require("morgan");

//setup .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

module.exports = app;
