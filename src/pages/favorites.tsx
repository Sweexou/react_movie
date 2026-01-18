import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export function Favorites() {
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Protection de la page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Chargement des films favoris
  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isAuthenticated) return;

      setError(null);

      if (!favorites || favorites.length === 0) {
        setMovies([]);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          favorites.map((id) =>
            api.getMovieById(String(id)).catch(() => null)
          )
        );

        const validMovies = results.filter(Boolean) as Movie[];
        if (!cancelled) setMovies(validMovies);
      } catch {
        if (!cancelled) setError("Erreur serveur");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [favorites, isAuthenticated]);

  if (!isAuthenticated) return null; // évite un flash avant redirect
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (favorites.length === 0) {
    return <p>Aucun favori pour le moment.</p>;
  }

  return (
    <div>
      <h1>❤️ Favorites</h1>
      <DisplayCards movies={movies} />
    </div>
  );
}
