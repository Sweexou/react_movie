import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

type FavoritesContextValue = {
  favorites: string[]; // ✅ rétro-compatible
  isFavorite: (movieId: string) => boolean;
  toggleFavorite: (movieId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  // ✅ Toujours un tableau, jamais undefined
  const [favorites, setFavorites] = useState<string[]>([]);

  async function refreshFavorites() {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }
    const res = await api.favoritesGet();
    setFavorites(Array.isArray(res.favorites) ? res.favorites : []);
  }

  useEffect(() => {
    refreshFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function isFavorite(movieId: string) {
    return favorites.includes(movieId);
  }

  async function toggleFavorite(movieId: string) {
    if (!isAuthenticated) return;

    if (isFavorite(movieId)) {
      const res = await api.favoriteRemove(movieId);
      setFavorites(Array.isArray(res.favorites) ? res.favorites : []);
    } else {
      const res = await api.favoriteAdd(movieId);
      setFavorites(Array.isArray(res.favorites) ? res.favorites : []);
    }
  }

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, refreshFavorites }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
