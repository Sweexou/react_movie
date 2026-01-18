import { Link, useNavigate } from "react-router-dom";
import "../style/layout.css";
import { useAuth } from "../context/AuthContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div>
      <header>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/favorites">Favorites ❤️</Link>
          <Link to="/settings">Settings ⚙️</Link>

          <div className="auth-actions">
            {isAuthenticated ? (
              <>
                <span className="user-label">👤 {user?.username}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/register">Sign in</Link>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
