import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const OAUTH_PROVIDERS = ["google", "github"]; // extend as needed

function OAuthButton({ provider }) {
  const oauthLogin = () => {
    // Let the backend handle OAuth initiation, open popup or redirect
    window.location.href = `/api/auth/oauth/${provider}`;
  };
  return (
    <button className="oauth-btn" onClick={oauthLogin} aria-label={`Login with ${provider}`}>
      Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );
}

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await login(fields);
      navigate("/");
    } catch (e) {
      setErr("Login failed: " + (e.message || "Unknown error"));
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <h1>Notebook Pro</h1>
      <form onSubmit={handleLogin} aria-label="Login form">
        <label>Email
          <input type="email" name="email" required value={fields.email} onChange={handleChange} autoFocus autoComplete="username" />
        </label>
        <label>Password
          <input type="password" name="password" required value={fields.password} onChange={handleChange} autoComplete="current-password" />
        </label>
        <button type="submit" disabled={submitting}>Login</button>
      </form>
      <div className="oauth-section">
        {OAUTH_PROVIDERS.map(p => <OAuthButton key={p} provider={p} />)}
      </div>
      <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
      {err && <div className="error" aria-live="polite">{err}</div>}
    </div>
  );
}
