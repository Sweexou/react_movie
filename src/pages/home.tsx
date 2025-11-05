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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <DisplayCards movies={movies} />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span> {page} </span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
