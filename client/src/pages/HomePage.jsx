import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#112233',
    }}>
      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}>
        <h1 style={{color:'#e8e9e0',}}>Welcome to Notepad</h1>
        <p style={{color:'#c0c0c0',}}>Take Home assessment submission</p>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
