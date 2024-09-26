import Restaurant from "@/models/restaurant";
import { createContext, useContext, useState } from "react";

type StorageProviderProps = {
  children: React.ReactNode;
};

type StorageProviderState = {
  place: Restaurant | null;
  setPlace: (place: Restaurant) => void;

  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

const initialState: StorageProviderState = {
  place: null,
  setPlace: () => null,

  favorites: [],
  setFavorites: () => null,
  addFavorite: () => null,
  removeFavorite: () => null,
};

const StorageProviderContext =
  createContext<StorageProviderState>(initialState);

export function StorageProvider({ children, ...props }: StorageProviderProps) {
  const [place, setPlace] = useState<Restaurant | null>(
    () =>
      JSON.parse(
        localStorage.getItem("paac-selected-place") || "{}"
      ) as Restaurant | null
  );
  const [favorites, setFavorites] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("paac-favorites") || "[]") as string[]
  );

  const value = {
    place: place,
    setPlace: (place: Restaurant) => {
      localStorage.setItem("paac-selected-place", JSON.stringify(place));
      setPlace(place);
    },

    favorites,
    setFavorites: (favorites: string[]) => {
      localStorage.setItem("paac-favorites", JSON.stringify(favorites));
      setFavorites(favorites);
    },
    addFavorite: (id: string) => {
      const newFavorites = [...favorites, id];
      localStorage.setItem("paac-favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    },
    removeFavorite: (id: string) => {
      const newFavorites = favorites.filter((s) => s != id);
      localStorage.setItem("paac-favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    },
  };

  return (
    <StorageProviderContext.Provider {...props} value={value}>
      {children}
    </StorageProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStorage = () => {
  const context = useContext(StorageProviderContext);

  if (context === undefined)
    throw new Error("useStorage must be used within a StorageProvider");

  return context;
};
