import React, { createContext, useState, useEffect, useCallback } from "react";
import * as api from "../api/endpoints";
import { setAuthToken } from "../api/client";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load user from API or localStorage
  useEffect(() => {
    async function fetchUser() {
      const local = window.localStorage.getItem("nbp_token");
      if (local) { setAuthToken(local); setToken(local); }
      try {
        if (local) {
          const u = await api.getCurrentUser();
          setUser(u);
        }
      } catch(e) {
        setUser(null);
        setToken(null);
        setAuthToken(null);
        window.localStorage.removeItem("nbp_token");
      }
      setLoading(false);
    }
    // Define handleLogout in this scope to fix eslint error
    function handleLogout() {
      setToken(null);
      setUser(null);
      setAuthToken(null);
      setLoading(false);
      window.localStorage.removeItem("nbp_token");
    }
    fetchUser();
    // Listen for session expirations
    window.addEventListener("session-expired", handleLogout);
    return () => {
      window.removeEventListener("session-expired", handleLogout);
    };
  }, []);

  // PUBLIC_INTERFACE
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const { token, user } = await api.login({ email, password });
      setAuthToken(token);
      setToken(token);
      setUser(user);
      window.localStorage.setItem("nbp_token", token);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    setLoading(false);
    window.localStorage.removeItem("nbp_token");
  }, []);

  // PUBLIC_INTERFACE
  const register = async ({ email, password, name }) => {
    setLoading(true);
    try {
      await api.register({ email, password, name });
      // Optionally, auto-login after registration
      await login({ email, password });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      register,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
