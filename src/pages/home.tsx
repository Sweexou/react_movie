import { useEffect, useState } from "react";
import { UseFetch } from "../hooks/useFetch";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";

export function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  const { data, loading, error } = UseFetch(URL);

  useEffect(() => {
    if (data?.results) {
      setMovies(data.results);
    }
  }, [data]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error: {error.message}</p>;

  return (
    <div className="page-container">
      <h1 className="page-title">🔥 Popular Movies</h1>

      <DisplayCards movies={movies} />

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="page-number">{page}</span>

        <button
          className="page-btn"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
