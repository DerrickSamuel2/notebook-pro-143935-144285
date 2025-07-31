import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PreferencesContext } from "../contexts/PreferencesContext";
import { useNavigate } from "react-router-dom";
import FoldersList from "./FoldersList";
import TagsList from "./TagsList";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const { prefs } = useContext(PreferencesContext);
  const navigate = useNavigate();
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <header>
        <span className="user-badge">{user?.name || user?.email || "User"}</span>
        <button onClick={logout} aria-label="Log out" className="sidebar-logout">Log out</button>
      </header>
      <FoldersList />
      <TagsList />
      <nav>
        <ul>
          <li><button onClick={() => navigate("/preferences")}>Preferences</button></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <span>Theme: {prefs.theme}</span>
      </div>
    </aside>
  );
}
