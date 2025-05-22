import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0'
    }}>
      <h1>Welcome to Notepad</h1>
      <p>Take Home assessment submission</p>
      <Link to="/notepad">
        <button style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#4A90E2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          ...Go...
        </button>
      </Link>
    </div>
  );
}
