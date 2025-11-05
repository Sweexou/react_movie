import React, { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/movie";

type FavoritesContextType = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // null = pas encore chargé depuis localStorage (permet de différencier "vide" et "pas encore lu")
  const [favorites, setFavorites] = useState<Movie[] | null>(null);

  // Lecture initiale depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) {
        setFavorites(JSON.parse(raw));
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error("Failed to read favorites from localStorage", err);
      setFavorites([]);
    }
  }, []);

  // Sauvegarde à chaque changement (une fois la lecture initiale faite)
  useEffect(() => {
    if (favorites === null) return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to write favorites to localStorage", err);
    }
  }, [favorites]);

  // Sync entre onglets (event storage)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "favorites") {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setFavorites([]);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      // si prev === null, on attend la lecture initiale -> on peut traiter comme vide
      const current = prev ?? [];
      const exists = current.some((m) => m.id === movie.id);
      return exists ? current.filter((m) => m.id !== movie.id) : [...current, movie];
    });
  };

  const isFavorite = (id: number) => {
    return (favorites ?? []).some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites: favorites ?? [], toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }
  return ctx;
};
