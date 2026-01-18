import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

type Review = {
  _id: string;
  movieId: string;
  username: string;
  title: string;
  content: string;
  rating?: number;
  createdAt?: string;
};

export function UserPublic() {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let cancelled = false;

    if (!username) {
      setLoading(false);
      setError("Missing username");
      return;
    }

    setLoading(true);
    setError(null);

    api
      .getUserPublic(username)
      .then((res) => {
        if (cancelled) return;
        setReviews(Array.isArray(res.reviews) ? (res.reviews as Review[]) : []);
      })
      .catch(() => {
        if (cancelled) return;
        setError("User not found");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>👤 {username}</h1>

      <h2>Reviews publiques</h2>
      {reviews.length === 0 ? <p>Aucune review.</p> : null}

      {reviews.map((r) => (
        <div key={r._id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
          <strong>{r.title}</strong>{" "}
          {typeof r.rating === "number" ? <span>({r.rating}/10)</span> : null}
          <div>
            Film: <Link to={`/movie/${encodeURIComponent(r.movieId)}`}>{r.movieId}</Link>
          </div>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
}
