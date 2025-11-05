import { MovieCard } from "./movieCard";
import type { Movie } from "../types/movie";
import "../style/displayCards.css";

interface DisplayCardsProps {
  movies: Movie[];
}

export function DisplayCards({ movies }: DisplayCardsProps) {
  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
