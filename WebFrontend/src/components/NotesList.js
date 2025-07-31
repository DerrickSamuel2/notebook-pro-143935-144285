import React from "react";

export default function NotesList({ notes, onNoteSelect }) {
  return (
    <ul className="notes-list" aria-label="Notes">
      {notes.map(n => (
        <li key={n.id}>
          <button onClick={() => onNoteSelect(n)} aria-label={`Open note "${n.title}"`}>
            {n.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
