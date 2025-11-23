import { useEffect, useState } from "react";
import { UseFetch } from "../hooks/useFetch";
import type { Movie } from "../types/movie";
import { DisplayCards } from "../component/displayCards";

export function Search() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchField, setSearchField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`;
  const { data, loading, error } = UseFetch(URL);

  useEffect(() => {
    if (data?.results) {
      setMovies(data.results);
    }
  }, [data]);

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchField);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🔎 Search Movies</h1>

      <div className="search-bar">
        <input
          type="text"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      <DisplayCards movies={movies} />

      {movies.length > 0 && (
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
      )}
    </div>
  );
}
