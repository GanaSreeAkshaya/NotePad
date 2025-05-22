import { useState, useEffect } from "react";
import './NoteModal.css'; // Style it later
import { addUpdateNote } from "../util/db";

export default function NoteModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) return alert("Title is required");

    const updatedNote = {
      ...note,
      title,
      content,
      updatedAt: new Date().toISOString(),
      synced: false
    };

    await addUpdateNote(updatedNote);
    onSave(); // Refresh list
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{note?.id ? "Edit Note" : "New Note"}</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write note content..."
        />
        <div className="modal-actions">
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
}
