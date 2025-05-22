import { useEffect, useState } from "react";
import { getAllNotes, addUpdateNote, deleteNote } from "../util/db";
import { v4 as uuidv4 } from "uuid";
import NoteModal from "./NoteModal";
import "./NotesList.css";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // note to be deleted

  const fetchNotes = async () => {
    const allNotes = await getAllNotes();
    setNotes(allNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    const id = uuidv4();
    setSelectedNote({
      id,
      title: "",
      content: "",
      updatedAt: new Date().toISOString(),
      synced: false,
    });
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      await deleteNote(confirmDelete.id);
      setConfirmDelete(null);
      fetchNotes();
    }
  };

  return (
    <div className="notes-page">
      <nav className="navbar">
        <h2>📒 My Notes</h2>
        <button onClick={handleAddNote} className="add-button">➕ Add Note</button>
      </nav>

      <div className="notes-container">
        {notes.length === 0 ? (
          <p>No notes found. Add one!</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content?.substring(0, 100)}...</p>
              <small>Last updated: {new Date(note.updatedAt).toLocaleString()}</small>
              <div className="card-actions">
                <button onClick={() => handleEditNote(note)}>✏️ Edit</button>
                <button onClick={() => setConfirmDelete(note)}>🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <NoteModal
          note={selectedNote}
          onClose={() => setShowModal(false)}
          onSave={fetchNotes}
        />
      )}

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Note</h3>
            <p>Are you sure you want to delete "<strong>{confirmDelete.title}</strong>"?</p>
            <div className="modal-actions">
              <button onClick={handleDelete}>✅ Yes, Delete</button>
              <button onClick={() => setConfirmDelete(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
