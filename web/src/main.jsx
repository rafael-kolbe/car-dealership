import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import WebRoutes from "./routes/WebRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WebRoutes />
  </BrowserRouter>,
);
