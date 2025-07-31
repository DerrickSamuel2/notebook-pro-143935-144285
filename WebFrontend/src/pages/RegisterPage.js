import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await register(fields);
      navigate("/");
    } catch (e) {
      setErr("Registration failed: " + (e.message || "Unknown error"));
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <h1>Create Your Notebook Pro Account</h1>
      <form onSubmit={handleRegister} aria-label="Register form">
        <label>Name
          <input type="text" name="name" required value={fields.name} onChange={handleChange} autoFocus autoComplete="name" />
        </label>
        <label>Email
          <input type="email" name="email" required value={fields.email} onChange={handleChange} autoComplete="username" />
        </label>
        <label>Password
          <input type="password" name="password" required value={fields.password} onChange={handleChange} autoComplete="new-password" />
        </label>
        <button type="submit" disabled={submitting}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login instead</Link></p>
      {err && <div className="error" aria-live="polite">{err}</div>}
    </div>
  );
}
