import React, { useContext } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";

export default function PreferencesPage() {
  const { prefs, setPreference } = useContext(PreferencesContext);
  return (
    <div className="preferences-page">
      <h1>User Preferences</h1>
      <label>
        Theme:
        <select 
          value={prefs.theme} 
          onChange={e => setPreference("theme", e.target.value)}
          aria-label="Set theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Font Size:
        <select
          value={prefs.accessibility?.fontSize}
          onChange={e => setPreference("accessibility", { ...prefs.accessibility, fontSize: e.target.value })}
          aria-label="Set font size"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      <label>
        <input 
          type="checkbox"
          checked={!!prefs.accessibility?.highContrast}
          onChange={e => setPreference("accessibility", { ...prefs.accessibility, highContrast: e.target.checked })}
        />
        High Contrast Mode
      </label>
    </div>
  );
}
