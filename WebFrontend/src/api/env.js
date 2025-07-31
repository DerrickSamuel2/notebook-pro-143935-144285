/// Centralizes environment variable values for backend API and OAuth.
/// All environment values should be referenced from this file to ensure consistent usage.
/// PUBLIC_INTERFACE
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";
export const OAUTH_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID || "";
export const OAUTH_REDIRECT_URI = process.env.REACT_APP_OAUTH_REDIRECT_URI || window.location.origin + "/oauth-callback";
