import PlaceSelectorElement from "@/components/place-selector-element";
import { useRestaurant } from "@/components/providers/restaurant-provider";
import { useStorage } from "@/components/providers/storage-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Restaurant from "@/models/restaurant";
import { ChevronsUpDown, Store } from "lucide-react";
import { useEffect, useState } from "react";

type RestaurantZoneGroup = {
  zone: string;
  dataset: string;
};

export default function PlaceSelector() {
  const { restaurants } = useRestaurant();
  const { favorites } = useStorage();
  const [zones, setZones] = useState<RestaurantZoneGroup[]>(
    [] as RestaurantZoneGroup[]
  );
  const [filter, setFilter] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [] as Restaurant[]
  );

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter(
        (restaurant: Restaurant) =>
          restaurant.title.toLowerCase().includes(filter.toLowerCase()) ||
          restaurant.zone.toLowerCase().includes(filter.toLowerCase()) ||
          restaurant.dataset.toLowerCase().includes(filter.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, restaurants]);

  useEffect(() => {
    const restaurantZoneGroups = filteredRestaurants.map(
      (restaurant: Restaurant) => {
        return { zone: restaurant.zone, dataset: restaurant.dataset };
      }
    );
    const unique: RestaurantZoneGroup[] = [];
    restaurantZoneGroups.forEach((r) => {
      if (!unique.find((u) => u.zone === r.zone && u.dataset === r.dataset)) {
        unique.push(r);
      }
    });

    const sorted = unique
      .sort(function (
        a: { zone: string; dataset: string },
        b: { zone: string; dataset: string }
      ) {
        const textA = a.zone.toUpperCase();
        const textB = b.zone.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .sort(function (
        a: { zone: string; dataset: string },
        b: { zone: string; dataset: string }
      ) {
        const textA = a.dataset.toUpperCase();
        const textB = b.dataset.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

    setZones(sorted);
  }, [filteredRestaurants]);

  return (
    <Dialog>
      <DialogTrigger>
        <Store />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Sélectionnez votre lieu de restauration</p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Input
          type="text"
          placeholder="Recherche..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="max-h-96 w-full overflow-auto divide-y-2">
          {favorites.length > 0 && (
            <Collapsible className="w-full">
              <CollapsibleTrigger className="w-full flex items-center justify-between space-x-4 px-4 py-2">
                <h4 className="capitalize font-medium text-left">Favoris</h4>
                <ChevronsUpDown />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-2">
                {filteredRestaurants
                  .filter((r: Restaurant) => favorites.includes(r.id))
                  .map((restaurant: Restaurant) => (
                    <PlaceSelectorElement
                      key={"f-" + restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
              </CollapsibleContent>
            </Collapsible>
          )}
          {zones.map(({ zone, dataset }) => (
            <Collapsible key={zone} className="w-full">
              <CollapsibleTrigger className="w-full flex items-center justify-between space-x-4 px-4 py-2">
                <h4 className="capitalize font-medium text-left">
                  [{dataset}] - {zone.toLowerCase()}
                </h4>
                <ChevronsUpDown />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-2">
                {filteredRestaurants
                  .filter((r: Restaurant) => r.zone === zone)
                  .map((restaurant: Restaurant) => (
                    <PlaceSelectorElement
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
