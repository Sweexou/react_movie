import { useParams, Link } from "react-router-dom";
import { UseFetch } from "../hooks/useFetch";
import "../style/MovieDetail.css";

export function MovieDetails() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { data, loading, error } = UseFetch(
    `${API_URL}/movies/${id}`
  );


  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error loading movie details</p>;
  if (!data) return null;

  return (
    <div className="movie-detail">
      <Link to="/" className="back-link">← Back</Link>

      <h1>{data.title}</h1>
      <p><strong>Release date:</strong> {data.release_date}</p>
      <p><strong>Rating:</strong> {data.vote_average}/10</p>
      <p><strong>Overview:</strong> {data.overview}</p>

      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      />
    </div>
  );
}
