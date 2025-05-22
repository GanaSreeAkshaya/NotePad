import { useEffect } from 'react';
import { syncNotes } from './util/syncing'; 

function App() {
  useEffect(() => {
    syncNotes(); // Run once on mount

    const handleOnline = () => syncNotes();

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <div>
    <h1>My Notepad App</h1>
  </div>
  );
}

export default App;