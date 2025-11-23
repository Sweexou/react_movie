import { useCallback, useEffect, useState } from "react";
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
    if (data?.results) setMovies(data.results);
  }, [data]);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  return (
    <div>
      <h1>🔥 Popular Movies</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}

      <DisplayCards movies={movies} />

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <span>{page}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
