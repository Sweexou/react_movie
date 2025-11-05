import React from "react";
import type { Movie } from "../types/movie";


export function MovieCard( {movie }: {movie: Movie} ) {
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>note {movie.popularity}</p>
            <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "20%", borderRadius: "8px" }}
          />
        </div>
    );
}