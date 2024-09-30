import Restaurant from "@/models/restaurant";
import { fetchRestaurants } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantProviderState = {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
};

const initialState: RestaurantProviderState = {
  restaurants: [] as Restaurant[],
  setRestaurants: () => null,
};

const RestaurantProviderContext =
  createContext<RestaurantProviderState>(initialState);

export function RestaurantProvider({
  children,
  ...props
}: RestaurantProviderProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    [] as Restaurant[]
  );

  useEffect(() => {
    const getRestaurants = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data);
    };

    getRestaurants();
  }, []);

  const value = {
    restaurants: restaurants,
    setRestaurants: (restaurants: Restaurant[]) => {
      setRestaurants(restaurants);
    },
  };

  return (
    <RestaurantProviderContext.Provider {...props} value={value}>
      {children}
    </RestaurantProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRestaurant = () => {
  const context = useContext(RestaurantProviderContext);

  if (context === undefined)
    throw new Error("useRestaurant must be used within a RestaurantProvider");

  return context;
};
