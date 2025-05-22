import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to the Notes App</h1>
      <Link to="/notepad">
        <button className="go-notepad">Open Notepad</button>
      </Link>
    </div>
  );
}

export default HomePage;
