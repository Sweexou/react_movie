import { DisplayCards } from "../component/displayCards";
import { useFavorites } from "../context/FavoritesContext";
import { useMemo } from "react";

export function Favorites() {
  const { favorites } = useFavorites();

  const sortedFavorites = useMemo(
    () => [...favorites].sort((a, b) => b.popularity - a.popularity),
    [favorites]
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❤️ Mes Favoris</h1>

      {sortedFavorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <DisplayCards movies={sortedFavorites} />
      )}
    </div>
  );
}
