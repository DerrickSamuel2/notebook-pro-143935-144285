import React, { useState } from "react";
import * as api from "../api/endpoints";

export default function NoteEditor({ note, onClose }) {
  const [fields, setFields] = useState({
    title: note.title || "",
    content: note.content || "",
    id: note.id
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const saveNote = async e => {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      if (fields.id) {
        await api.updateNote(fields.id, { title: fields.title, content: fields.content });
      } else {
        await api.createNote({ title: fields.title, content: fields.content });
      }
      onClose();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  };

  const deleteNote = async () => {
    if (!fields.id) return;
    setSaving(true);
    try {
      await api.deleteNote(fields.id);
      onClose();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  };

  return (
    <div className="note-editor-modal" role="dialog" aria-modal="true">
      <form className="note-editor" onSubmit={saveNote}>
        <label>
          Title
          <input name="title" value={fields.title} onChange={handleChange} required />
        </label>
        <label>
          Content
          <textarea name="content" value={fields.content} onChange={handleChange} required rows={10} aria-multiline />
        </label>
        <div className="note-editor-actions">
          <button type="submit" disabled={saving}>{fields.id ? "Update" : "Create"}</button>
          {fields.id && <button type="button" onClick={deleteNote} disabled={saving}>Delete</button>}
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}
