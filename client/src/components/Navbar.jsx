export default function Navbar() {
  const isOnline = navigator.onLine;

  return (
    <nav style={{
  width: '100%',
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
      <h2>📝 Notepad</h2>
      <p>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
    </nav>
  );
}
