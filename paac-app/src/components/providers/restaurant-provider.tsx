import Restaurant from "@/models/restaurant";
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
      const response = await fetch("/api/restaurants/");
      // const response = await fetch("http://127.0.0.1:8080/restaurants");
      const data = (await response.json()) as Restaurant[];

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
