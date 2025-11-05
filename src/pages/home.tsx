import { useState } from "react";
import { UseFetch } from "../hooks/useFetch";

export function Home() {
    const [page, setPage] = useState(1);
    const [films, setFilms] = useState([]);
    const data = UseFetch(`https://api.example.com/data?page=${page}`);




    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span> {page} </span>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
}