import React, { useState, useEffect } from "react";
import * as api from "../api/endpoints";
import NoteEditor from "./NoteEditor";
import NotesList from "./NotesList";

export default function NotesPanel() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getNotes({ q: search }).then(setNotes).finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="notes-panel">
      <div className="notes-panel-header">
        <input 
          aria-label="Search notes"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setSelectedNote({})}>➕ New Note</button>
      </div>
      {loading ? (
        <div role="status" aria-busy="true">Loading notes…</div>
      ) : (
        <NotesList notes={notes} onNoteSelect={setSelectedNote} />
      )}
      {selectedNote && (
        <NoteEditor note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
}
