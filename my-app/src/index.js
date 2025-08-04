// src/index.js
import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from './App';
import "./index.css";
// import App from "./admin-panel/App";
// import LoginPage from "./login/LoginPage";
import App from "./admin-panel/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/* <LoginPage /> */}
    <App />
  </StrictMode>
);
