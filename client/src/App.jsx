import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotepadPage from './pages/NotepadPage';

function App() {
  // Sync useEffect here if needed

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notepad" element={<NotepadPage />} />
    </Routes>
  );
}

export default App;