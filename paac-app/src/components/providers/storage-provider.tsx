import Restaurant from "@/models/restaurant";
import { createContext, useContext, useState } from "react";

type Settings = {
  bkth?: boolean;
};

type StorageProviderProps = {
  children: React.ReactNode;
};

type StorageProviderState = {
  places: Restaurant[];
  setPlaces: (places: Restaurant[]) => void;
  addPlace: (place: Restaurant) => void;
  removePlace: (place: Restaurant) => void;

  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;

  settings: Settings;
  setSettings: (settings: Settings) => void;
  setSetting: (key: keyof Settings, value: unknown) => void;
};

const initialState: StorageProviderState = {
  places: [],
  setPlaces: () => null,
  addPlace: () => null,
  removePlace: () => null,

  favorites: [],
  setFavorites: () => null,
  addFavorite: () => null,
  removeFavorite: () => null,

  settings: {},
  setSettings: () => null,
  setSetting: () => null,
};

const StorageProviderContext =
  createContext<StorageProviderState>(initialState);

export function StorageProvider({ children, ...props }: StorageProviderProps) {
  const [places, setPlaces] = useState<Restaurant[]>(
    () =>
      JSON.parse(
        localStorage.getItem("paac-selected-places") || "[]"
      ) as Restaurant[]
  );
  const [favorites, setFavorites] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("paac-favorites") || "[]") as string[]
  );

  const [settings, setSettings] = useState<Settings>(() => {
    const settings = localStorage.getItem("paac-settings");
    if (settings) {
      return JSON.parse(settings) as Settings;
    }
    return {};
  });

  const value = {
    places: places,
    setPlaces: (places: Restaurant[]) => {
      localStorage.setItem("paac-selected-places", JSON.stringify(places));
      setPlaces(places);
    },
    addPlace: (place: Restaurant) => {
      if (!places.find((p) => p.id == place.id)) {
        const newPlaces = [...places, place];
        localStorage.setItem("paac-selected-places", JSON.stringify(newPlaces));
        setPlaces(newPlaces);
      }
    },
    removePlace: (place: Restaurant) => {
      const newPlaces = places.filter((p) => p.id != place.id);
      localStorage.setItem("paac-selected-places", JSON.stringify(newPlaces));
      setPlaces(newPlaces);
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

    settings,
    setSettings: (settings: Settings) => {
      localStorage.setItem("paac-settings", JSON.stringify(settings));
      setSettings(settings);
    },
    setSetting: (key: string, value: unknown) => {
      const newSettings = { ...settings, [key]: value };
      localStorage.setItem("paac-settings", JSON.stringify(newSettings));
      setSettings(newSettings);
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
