import { useState, useEffect } from "react";
import { addUpdateNote, getAllNotes } from "../util/db";
import "./NoteModal.css";

export default function NoteModal({ note, onClose, onSave }) {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
    setError("");
  }, [note]);

  const handleSave = async () => {
    const allNotes = await getAllNotes();

    const isDuplicate = allNotes.some(
      (n) => n.id !== note.id && n.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (!title.trim()) {
      setError("Note title is required.");
      return;
    }

    if (isDuplicate) {
      setError("Note title already exists. Please choose a different name.");
      return;
    }

    const updatedNote = {
      ...note,
      title: title.trim(),
      content,
      updatedAt: new Date().toISOString(),
      synced: false,
    };

    await addUpdateNote(updatedNote);
    onSave();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{note.id ? "Edit Note" : "Add Note"}</h3>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Note Title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content (Markdown supported)"
          rows="6"
        />

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
}
