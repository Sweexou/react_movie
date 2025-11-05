import { MovieCard } from "./movieCard";
import type { Movie } from "../types/movie";

interface DisplayCardsProps {
    movies: Movie[];
}

export function DisplayCards({ movies }: DisplayCardsProps) {
    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}