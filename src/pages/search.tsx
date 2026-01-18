import { useCallback, useEffect, useMemo, useState } from "react";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";
import { api } from "../services/api";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const trimmed = useMemo(() => searchTerm.trim(), [searchTerm]);

  // Quand on change le terme, on revient à la page 1
  useEffect(() => {
    setPage(1);
  }, [trimmed]);

  useEffect(() => {
    let cancelled = false;

    // Ne pas appeler l'API si recherche vide
    if (!trimmed) {
      setMovies([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    api
      .getMovies({ search: trimmed, page })
      .then((data) => {
        if (cancelled) return;
        if (data?.results) setMovies(data.results);
        else setMovies([]);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "An error occurred");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [trimmed, page]);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  return (
    <div>
      <h1>🔎 Search</h1>

      <input
        type="text"
        placeholder="Search a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!trimmed && <p>Type something to search.</p>}

      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}

      <DisplayCards movies={movies} />

      {/* Pagination uniquement si on a une recherche */}
      {trimmed && (
        <div className="pagination">
          <button onClick={prevPage} disabled={page === 1 || loading}>
            Previous
          </button>
          <span>{page}</span>
          <button onClick={nextPage} disabled={loading}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
