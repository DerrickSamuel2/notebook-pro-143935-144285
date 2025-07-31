import React, { useState, useEffect } from "react";
import * as api from "../api/endpoints";

export default function FoldersList() {
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    api.getFolders().then(setFolders).catch(() => setFolders([]));
  }, []);

  return (
    <section className="sidebar-section" aria-label="Folders">
      <h2>Folders</h2>
      <ul>
        {folders.map(f => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </section>
  );
}
