import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import AppRouter from "./pages/AppRouter";
import "./index.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PreferencesProvider>
        <AppRouter />
      </PreferencesProvider>
    </AuthProvider>
  </React.StrictMode>
);
