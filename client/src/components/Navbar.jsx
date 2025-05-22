export default function Navbar() {
  const isOnline = navigator.onLine;

  return (
    <nav style={{
      width: '100%',
      boxSizing: 'border-box',  // Important to include padding safely
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#4A90E2',
      color: 'white'
    }}>
      <h2 style={{ margin: 0 }}>📝 Notepad</h2>
      <p style={{ margin: 0 }}>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
    </nav>
  );
}
