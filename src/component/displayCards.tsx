import "../style/cards.css";
import type { Movie } from "../types/movie";
import { MovieCard } from "./movieCard";

export function DisplayCards({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
