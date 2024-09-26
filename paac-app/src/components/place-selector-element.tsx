import { useStorage } from "@/components/providers/storage-provider";
import { cn } from "@/lib/utils";
import Restaurant from "@/models/restaurant";
import { Star } from "lucide-react";

type PlaceSelectorElementProps = {
  restaurant: Restaurant;
};

export default function PlaceSelectorElement({
  restaurant,
}: PlaceSelectorElementProps) {
  const { place, setPlace, favorites, addFavorite, removeFavorite } =
    useStorage();

  function selectPlace(restaurant: Restaurant) {
    setPlace(restaurant);
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
        "px-8 py-1 flex items-center cursor-pointer transition-colors rounded",
        restaurant.id === place?.id && "bg-primary text-primary-foreground",
        restaurant.id !== place?.id && "hover:bg-primary/20"
      )}
    >
      <div className="w-full" onClick={() => selectPlace(restaurant)}>
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
