import Navbar from '../components/Navbar';
import NotesList from '../components/NotesList';

function NotepadPage() {
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    padding: 0,
    margin: 0,
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <NotesList />
    </div>
  );
}

export default NotepadPage;
