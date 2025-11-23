import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import type { Movie } from "../types/movie";
import "../style/cards.css";

function MovieCardComponent({ movie }: { movie: Movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </Link>

      <div className="card-body">
        <div className="card-title">
          <span>{movie.title}</span>

          <Heart
            onClick={() => toggleFavorite(movie)}
            className={favorite ? "heart-active" : "heart-inactive"}
          />
        </div>

        <p className="popularity">⭐ Popularity: {movie.popularity}</p>
      </div>
    </div>
  );
}

export const MovieCard = React.memo(MovieCardComponent);
