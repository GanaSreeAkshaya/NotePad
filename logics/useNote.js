import { useState, useEffect } from 'react';
import { getAllNotes, addUpdateNote, deleteNote } from '../util/db';

const useNote = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await getAllNotes();
      setNotes(allNotes);
    };
    fetchNotes();
  }, []);

  const saveNote = async (note) => {
    await addUpdateNote(note);
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex((n) => n.id === note.id);
      if (existingNoteIndex !== -1) {
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = note;
        return updatedNotes;
      }
      return [...prevNotes, note];
    });
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return {
    notes,
    saveNote,
    removeNote,
  };
};

export default useNote;