import { Link } from "react-router-dom";
import "../style/layout.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites ❤️</Link>
          <Link to="/settings">Settings ⚙️</Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
