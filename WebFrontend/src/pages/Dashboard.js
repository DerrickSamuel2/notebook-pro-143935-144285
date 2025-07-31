import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import NotesPanel from "../components/NotesPanel";
import NotificationToaster from "../components/NotificationToaster";
import { PreferencesContext } from "../contexts/PreferencesContext";

export default function Dashboard() {
  const { prefs } = useContext(PreferencesContext);
  return (
    <div className={`dashboard theme-${prefs.theme}`}>
      <Sidebar />
      <main className="dashboard-main" aria-label="Main content">
        <NotesPanel />
      </main>
      <NotificationToaster />
    </div>
  );
}
