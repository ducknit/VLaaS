// src/main.jsx (or index.js)
import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

// ⚠️ PASTE YOUR CLIENT ID HERE
const googleClientId = "94033811746-dvj378q69up51qjju2dsgo5t849t1822.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);