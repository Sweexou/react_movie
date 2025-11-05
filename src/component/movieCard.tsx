import React from "react";
import type { Movie } from "../types/movie";
import "../style/movieCard.css";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="card-img"
      />
      <div className="card-body">
        <h2>{movie.title}</h2>
        <p>Popularity: {movie.popularity}</p>
      </div>
    </div>
  );
}
