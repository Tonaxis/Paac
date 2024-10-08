import PlaceSelectorElement from "@/components/place-selector/place-selector-element";
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
import { Check, ChevronsUpDown, Star, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Map from "@/components/map/Map";
import MapMarker from "@/components/map/map-marker";
import MapMarkerUser from "@/components/map/map-marker-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type RestaurantZoneGroup = {
  zone: string;
  dataset: string;
};

export default function PlaceSelector() {
  const { t } = useTranslation();
  const { restaurants } = useRestaurant();
  const {
    places,
    addPlace,
    removePlace,
    favorites,
    addFavorite,
    removeFavorite,
  } = useStorage();
  const [zones, setZones] = useState<RestaurantZoneGroup[]>(
    [] as RestaurantZoneGroup[]
  );
  const [filter, setFilter] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [] as Restaurant[]
  );
  const [gpsPosition, setGpsPosition] = useState<[number, number]>([0, 0]);

  function togglePlace(restaurant: Restaurant) {
    if (places.find((p: Restaurant) => p.id == restaurant.id)) {
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        setGpsPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

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
            <p>{t("select_your_places")}</p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="search" className="w-full">
              Recherche
            </TabsTrigger>
            <TabsTrigger value="map" className="w-full">
              Carte
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <Input
              type="text"
              placeholder={t("search")}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-2 border-border rounded p-2 ring-offset-input mb-2"
            />
            <div className="max-h-96 w-full overflow-auto divide-y-2">
              {favorites.length > 0 && (
                <>
                  <div className="pb-5">
                    <h2 className="flex gap-2 mb-5">
                      <Star className="fill-primary stroke-primary" />
                      {t("favorites")}
                    </h2>
                    <ul>
                      {filteredRestaurants
                        .filter((r: Restaurant) => favorites.includes(r.id))
                        .map((restaurant: Restaurant) => (
                          <PlaceSelectorElement
                            key={"f-" + restaurant.id}
                            restaurant={restaurant}
                          />
                        ))}
                    </ul>
                  </div>
                </>
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
          </TabsContent>
          <TabsContent value="map">
            <div className="h-96 w-full">
              <Map
                position={
                  gpsPosition
                    ? {
                        lat: gpsPosition[0],
                        lon: gpsPosition[1],
                      }
                    : {
                        lat: 0,
                        lon: 0,
                      }
                }
              >
                {filteredRestaurants.map((restaurant: Restaurant) => (
                  <MapMarker
                    key={restaurant.id}
                    position={{
                      lat: parseFloat(restaurant.lat),
                      lon: parseFloat(restaurant.lon),
                    }}
                    restaurant={restaurant}
                  >
                    <div>
                      <div
                        className={cn(
                          "pl-6 flex items-center gap-2 cursor-pointer transition-colors rounded"
                        )}
                      >
                        <div
                          className="relative w-full"
                          onClick={() => togglePlace(restaurant)}
                        >
                          <div className="size-4 rounded-sm border-2 border-foreground absolute -left-[9px] top-1/2 -translate-x-full -translate-y-1/2" />
                          {places.find(
                            (p: Restaurant) => p.id == restaurant.id
                          ) && (
                            <Check
                              size={28}
                              className="absolute stroke-primary -left-0.5 top-1/2 -translate-x-full -translate-y-1/2"
                              style={{
                                filter:
                                  "drop-shadow(0 2px 0 hsl(var(--background)))",
                              }}
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
                    </div>
                  </MapMarker>
                ))}
                {gpsPosition && (
                  <MapMarkerUser
                    position={{ lat: gpsPosition[0], lon: gpsPosition[1] }}
                  />
                )}
              </Map>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
