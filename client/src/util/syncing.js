// src/util/sync.js
import { getAllNotes, addUpdateNote } from './db';

const URL = 'https://682f687ff504aa3c70f3eb6d.mockapi.io/api/v1/notes';

export const syncNotes = async () => {
  if (!navigator.onLine) return;

  try {
    const NotesBup = await getAllNotes();

    // uploading unsynced notes to server
    for (const note of NotesBup) {
      if (!note.synced) {
        const res = await fetch(`${URL}/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });

        if (res.ok) {
          await addUpdateNote({ ...note, synced: true });
        } else {
          console.error(`Failed to sync note ${note.id}`);
        }
      }
    }

    const res = await fetch(URL);
    const BupNotes = await res.json();

    for (const remote of BupNotes) {
      await addUpdateNote({ ...remote, synced: true });
    }
  } catch (err) {
    console.error('Cant be Synchronized...', err);
  }
};
