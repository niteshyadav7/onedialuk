// api.js or api.jsx

import axios from "axios";

// Create base axios instance
const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Register a new user
export const registerUser = (data) => API.post("/auth/register", data);

// Log in a user
export const loginUser = (data) => API.post("/auth/login", data);

// Trigger forgot password flow
export const forgotPassword = (data) => API.post("/auth/forget-password", data);
