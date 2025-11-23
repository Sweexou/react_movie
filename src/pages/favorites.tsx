import { DisplayCards } from "../component/displayCards";
import { useFavorites } from "../context/FavoritesContext";

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❤️ Mes Favoris</h1>

      {favorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <DisplayCards movies={favorites} />
      )}
    </div>
  );
}
