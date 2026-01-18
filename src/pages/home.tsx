import { useCallback, useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";
import { api } from "../services/api";

export function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    api
      .getMovies({ page })
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
  }, [page]);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  return (
    <div>
      <h1>🔥 Popular Movies</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}

      <DisplayCards movies={movies} />

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>{page}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
