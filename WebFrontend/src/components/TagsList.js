import React, { useState, useEffect } from "react";
import * as api from "../api/endpoints";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    api.getTags().then(setTags).catch(() => setTags([]));
  }, []);
  return (
    <section className="sidebar-section" aria-label="Tags">
      <h2>Tags</h2>
      <ul>
        {tags.map(t => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </section>
  );
}
