import React, { createContext, useCallback, useState, useEffect, useContext } from "react";
import * as api from "../api/endpoints";
import { AuthContext } from "./AuthContext";

export const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [prefs, setPrefs] = useState({
    theme: "light",
    accessibility: {
      highContrast: false,
      fontSize: "medium"
    }
  });

  // Load preferences for authenticated user
  useEffect(() => {
    async function fetchPrefs() {
      if (user) {
        try {
          const serverPrefs = await api.getPreferences();
          setPrefs(serverPrefs);
        } catch(e) {
          // fallback: local default
        }
      }
    }
    fetchPrefs();
  }, [user]);

  // PUBLIC_INTERFACE
  const setPreference = useCallback(async (key, value) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    try { await api.updatePreferences({ [key]: value }); } catch(e) { /* ignore */ }
    // Theme handling
    if (key === "theme") {
      document.documentElement.setAttribute("data-theme", value);
    }
  }, [prefs]);

  useEffect(() => {
    // On mount, set theme based on preferences
    document.documentElement.setAttribute("data-theme", prefs.theme || "light");
  }, [prefs.theme]);

  return (
    <PreferencesContext.Provider value={{ prefs, setPreference }}>
      {children}
    </PreferencesContext.Provider>
  );
}
