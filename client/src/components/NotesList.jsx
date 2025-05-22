import { useEffect, useState } from "react";
import { getAllNotes, addUpdateNote, deleteNote } from "../util/db";
import { v4 as uuidv4 } from "uuid";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotes = async () => {
    const all = await getAllNotes();
    setNotes(all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!noteTitle.trim()) return alert("Title cannot be empty");

    const isDuplicate = notes.some(
      (note) =>
        note.title.trim().toLowerCase() === noteTitle.trim().toLowerCase() &&
        note.id !== editNoteId
    );

    if (isDuplicate) {
      alert("Duplicate title not allowed.");
      return;
    }

    const newNote = {
      id: editNoteId || uuidv4(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      updatedAt: new Date().toISOString(),
      synced: false,
    };

    await addUpdateNote(newNote);
    setNoteTitle("");
    setNoteContent("");
    setEditNoteId(null);
    setShowModal(false);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setConfirmDeleteId(null);
    fetchNotes();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Search and Add */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={() => setShowModal(true)}>➕ Add Note</button>
      </div>

      {/* Notes Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{
              width: "calc(50% - 0.5rem)",
              backgroundColor: "#f0f8ff",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{note.title}</h3>
            <p style={{ whiteSpace: "pre-wrap", color: "#444" }}>
              {note.content || "No content"}
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleEdit(note)}>✏️ Edit</button>
              <button
                onClick={() => setConfirmDeleteId(note.id)}
                style={{ backgroundColor: "#e57373", color: "white" }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3>{editNoteId ? "Edit Note" : "New Note"}</h3>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Title"
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Content"
              rows={4}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleAddOrUpdate}>
                {editNoteId ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNoteTitle("");
                  setNoteContent("");
                  setEditNoteId(null);
                }}
                style={{ backgroundColor: "#eee", color: "#000" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "350px",
              textAlign: "center",
            }}
          >
            <p>Are you sure you want to delete this note?</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1rem" }}>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                style={{ backgroundColor: "#d32f2f", color: "white" }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                style={{ backgroundColor: "#ccc", color: "#000" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
