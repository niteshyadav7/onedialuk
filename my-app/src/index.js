import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const elm = document.getElementById("root");
const root = ReactDOM.createRoot(elm);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
