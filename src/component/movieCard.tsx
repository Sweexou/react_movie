import React from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { useFavorites } from "../context/FavoritesContext";
import { Heart } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <div className="card" style={{ position: "relative" }}>
      {/* Bouton coeur */}
      <button
        onClick={(e) => {
          e.preventDefault(); // empêche le Link parent de naviguer si le bouton se trouve dans le Link
          e.stopPropagation();
          toggleFavorite(movie);
        }}
        aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 5,
        }}
      >
        <Heart fill={favorite ? "red" : "none"} />
      </button>

      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="card-body">
          <h2>{movie.title}</h2>
          <p>Popularity: {movie.popularity}</p>
        </div>
      </Link>
    </div>
  );
}
