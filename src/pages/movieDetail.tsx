import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../style/reviews.css";

type Review = {
  _id: string;
  movieId: string;
  username: string;
  title: string;
  content: string;
  rating?: number;
  createdAt?: string;
};

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // create form
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number | "">("");

  // edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState<number | "">("");
  const [editLoading, setEditLoading] = useState(false);

  async function refreshReviews(movieId: string) {
    const res = await api.getReviewsByMovie(movieId);
    setReviews(Array.isArray(res.reviews) ? (res.reviews as Review[]) : []);
  }

  // movie
  useEffect(() => {
    let cancelled = false;

    if (!id) {
      setMovie(null);
      setLoading(false);
      setError("Movie id missing");
      return;
    }

    setLoading(true);
    setError(null);

    api
      .getMovieById(id)
      .then((data) => {
        if (cancelled) return;
        setMovie(data ?? null);
      })
      .catch((e: any) => {
        if (cancelled) return;
        setError(e?.status === 404 ? "Movie not found" : "Erreur serveur");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // reviews
  useEffect(() => {
    let cancelled = false;
    if (!id) return;

    setReviewsLoading(true);
    api
      .getReviewsByMovie(id)
      .then((res) => {
        if (cancelled) return;
        setReviews(Array.isArray(res.reviews) ? (res.reviews as Review[]) : []);
      })
      .catch(() => {
        if (cancelled) return;
        setReviews([]);
      })
      .finally(() => {
        if (cancelled) return;
        setReviewsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    await api.createReview({
      movieId: id,
      title: reviewTitle,
      content: reviewContent,
      rating: reviewRating === "" ? undefined : Number(reviewRating),
    });

    setReviewTitle("");
    setReviewContent("");
    setReviewRating("");

    await refreshReviews(id);
  }

  async function deleteMyReview(reviewId: string) {
    if (!id) return;
    await api.deleteReview(reviewId);
    await refreshReviews(id);
  }

  function startEdit(r: Review) {
    setEditingId(r._id);
    setEditTitle(r.title);
    setEditContent(r.content);
    setEditRating(typeof r.rating === "number" ? r.rating : "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setEditRating("");
  }

  async function saveEdit(reviewId: string) {
    if (!id) return;

    setEditLoading(true);
    try {
      await api.updateReview(reviewId, {
        title: editTitle,
        content: editContent,
        rating: editRating === "" ? undefined : Number(editRating),
      });
      await refreshReviews(id);
      cancelEdit();
    } finally {
      setEditLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  const posterUrl =
    typeof (movie as any).poster_path === "string"
      ? `https://image.tmdb.org/t/p/w500${(movie as any).poster_path}`
      : null;

  return (
    <div>
      <h1>{movie.title}</h1>

      {posterUrl ? <img src={posterUrl} alt={movie.title} /> : <p>No poster available</p>}

      {typeof movie.overview === "string" && <p>{movie.overview}</p>}

      <div className="reviews-section">
        <h2 className="reviews-title">Reviews</h2>

        {reviewsLoading && <p>Loading reviews...</p>}
        {!reviewsLoading && reviews.length === 0 && <p>Aucune review pour ce film.</p>}

        {reviews.map((r) => {
          const isOwner = user?.username === r.username;
          const isEditing = editingId === r._id;

          return (
            <div key={r._id} className="review-card">
              <div className="review-header">
                <div className="review-meta" style={{ flex: 1 }}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                        style={{ width: "100%" }}
                      />

                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        required
                        style={{ width: "100%", marginTop: 8 }}
                      />

                      <input
                        type="number"
                        min={0}
                        max={10}
                        placeholder="Rating (0-10) optionnel"
                        value={editRating}
                        onChange={(e) =>
                          setEditRating(e.target.value === "" ? "" : Number(e.target.value))
                        }
                        style={{ width: "100%", marginTop: 8 }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="review-title">
                        <strong>{r.title}</strong>{" "}
                        {typeof r.rating === "number" ? <span>({r.rating}/10)</span> : null}
                      </div>

                      <div className="review-user">
                        par{" "}
                        <Link to={`/user/${encodeURIComponent(r.username)}`}>{r.username}</Link>
                      </div>

                      <p className="review-content">{r.content}</p>
                    </>
                  )}
                </div>

                {isAuthenticated && isOwner && (
                  <div className="review-actions">
                    {isEditing ? (
                      <>
                        <button className="edit" onClick={() => saveEdit(r._id)} disabled={editLoading}>
                          {editLoading ? "Saving..." : "Save"}
                        </button>
                        <button className="secondary" onClick={cancelEdit} disabled={editLoading}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="edit" onClick={() => startEdit(r)}>
                          Edit
                        </button>
                        <button className="delete" onClick={() => deleteMyReview(r._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isAuthenticated ? (
          <div className="review-form">
            <h3>Ajouter une review</h3>

            <form onSubmit={submitReview}>
              <input
                className="field-title"
                type="text"
                placeholder="Titre"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                required
              />

              <input
                className="field-rating"
                type="number"
                placeholder="Rating"
                min={0}
                max={10}
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value === "" ? "" : Number(e.target.value))}
              />

              <button className="submit-btn" type="submit">
                Publier
              </button>

              <textarea
                placeholder="Contenu"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                required
              />
            </form>
          </div>
        ) : (
          <p>
            Pour écrire une review, <Link to="/login">connecte-toi</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
