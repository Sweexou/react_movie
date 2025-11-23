import { UseFetch } from "../hooks/useFetch";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";
import { useEffect, useState, useCallback } from "react";

export function Search() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchField, setSearchField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`;
  const { data, loading, error } = UseFetch(URL);

  const triggerSearch = useCallback(() => {
    setPage(1);
    setSearchTerm(searchField);
  }, [searchField]);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  useEffect(() => {
    if (data?.results) setMovies(data.results);
  }, [data]);

  return (
    <div>
      <input
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        placeholder="Search for a movie..."
      />

      <button onClick={triggerSearch}>Search</button>

      <DisplayCards movies={movies} />

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <span>{page}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
