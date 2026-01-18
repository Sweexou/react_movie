import React from "react";
import "../style/cards.css";
import type { Movie } from "../types/movie";
import { MovieCard } from "./movieCard";

function DisplayCardsComponent({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard
          key={String(m.id)}
          movie={m}
        />
      ))}
    </div>
  );
}

export const DisplayCards = React.memo(DisplayCardsComponent);
