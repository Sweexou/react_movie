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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <input
                type="text"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button onClick={() => { setPage(1); setSearchTerm(searchField); }}>Search</button>
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