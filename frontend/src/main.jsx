import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { AuthProvider } from "./utils/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <StyledEngineProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
