import { useStorage } from "@/components/providers/storage-provider";
import { cn } from "@/lib/utils";
import Restaurant from "@/models/restaurant";
import { Check, Star } from "lucide-react";

type PlaceSelectorElementProps = {
  restaurant: Restaurant;
};

export default function PlaceSelectorElement({
  restaurant,
}: PlaceSelectorElementProps) {
  const {
    places,
    addPlace,
    removePlace,
    favorites,
    addFavorite,
    removeFavorite,
  } = useStorage();

  function togglePlace(restaurant: Restaurant) {
    if (places.includes(restaurant)) {
      removePlace(restaurant);
    } else {
      addPlace(restaurant);
    }
  }

  function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }

  return (
    <div
      className={cn(
        "px-8 py-1 flex items-center cursor-pointer transition-colors rounded"
      )}
    >
      <div className="relative w-full" onClick={() => togglePlace(restaurant)}>
        {places.find((p: Restaurant) => p.id == restaurant.id) && (
          <Check
            size={20}
            className="absolute stroke-primary -left-1 top-1/2 -translate-x-full -translate-y-1/2"
          />
        )}
        {restaurant.title}
      </div>

      <label htmlFor={"favorite-" + restaurant.id}>
        <Star
          className={cn(
            "cursor-pointer",
            favorites.includes(restaurant.id) &&
              "fill-yellow-400 stroke-yellow-400"
          )}
        />
      </label>
      <input
        id={"favorite-" + restaurant.id}
        type="checkbox"
        className="hidden"
        onChange={() => toggleFavorite(restaurant.id)}
      />
    </div>
  );
}
