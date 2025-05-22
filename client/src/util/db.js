import { openDB } from 'idb';

const DB = 'notefiles';
const NAME = 'notes';

export const initDB = async () => {
  return openDB(DB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(NAME)) {
        db.createObjectStore(NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addUpdateNote = async (note) => {
  const db = await initDB();
  await db.put(NAME, note);
};

export const deleteNote = async (id) => {
  const db = await initDB();
  await db.delete(NAME, id);
};

export const getAllNotes = async () => {
  const db = await initDB();
  return await db.getAll(NAME);
};
