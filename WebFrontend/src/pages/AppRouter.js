import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import OAuthCallbackPage from "./OAuthCallbackPage";
import Dashboard from "./Dashboard";
import PreferencesPage from "./PreferencesPage";
import NotFoundPage from "./NotFoundPage";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

/// PUBLIC_INTERFACE
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
        <Route path="/preferences" element={
          <PrivateRoute>
            <PreferencesPage />
          </PrivateRoute>
        } />
        <Route path="/*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
