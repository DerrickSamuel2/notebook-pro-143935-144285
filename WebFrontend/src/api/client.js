import { API_BASE_URL } from "./env";

let authToken = null;

/// PUBLIC_INTERFACE
export function setAuthToken(token) {
  authToken = token;
}

/// PUBLIC_INTERFACE
export function getAuthToken() {
  return authToken;
}

function getHeaders(extra = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...extra,
  };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

/// PUBLIC_INTERFACE
export async function apiRequest(endpoint, { method = "GET", body, params, headers = {}, ...opts } = {}) {
  let url = `${API_BASE_URL}${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const usp = new URLSearchParams(params);
    url += `?${usp.toString()}`;
  }
  const fetchOpts = {
    method,
    headers: getHeaders(headers),
    credentials: "include",
    ...opts,
  };
  if (body) fetchOpts.body = JSON.stringify(body);
  const res = await fetch(url, fetchOpts);
  if (res.status === 401) {
    // Implement app-specific logic to handle logout/session expiration
    window.dispatchEvent(new CustomEvent("session-expired"));
  }
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `API error: ${res.status}`);
  }
  if (res.status === 204) return null; // No Content
  return res.json();
}
