import { useStorage } from "@/components/providers/storage-provider";
import getIcon from "@/components/type-icon/icons";
import Restaurant from "@/models/restaurant";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

type MapMarkerProps = {
  children?: React.ReactNode;
  restaurant: Restaurant;
  position: {
    lat: number;
    lon: number;
  };
};

export default function MapMarker({
  children,
  restaurant,
  position,
}: MapMarkerProps) {
  const { places, favorites } = useStorage();

  return (
    <Marker
      position={[position.lat, position.lon]}
      icon={L.divIcon({
        html: `
          <div class="relative">
            <svg
              width="32.8"
              height="40"
              viewBox="0 0 82 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="${
                  favorites.includes(restaurant.id)
                    ? "fill-yellow-400"
                    : "fill-primary"
                }"
                d="M82 41.25C82 64.0317 67.0909 88.75 41 100C14.9091 88.75 0 64.0317 0 41.25C0 18.4683 18.3563 0 41 0C63.6437 0 82 18.4683 82 41.25Z"
              />
            </svg>
            <div class="absolute top-[6.4px] left-[6.4px] font-medium z-50">
              ${
                favorites.includes(restaurant.id)
                  ? `<svg class="size-5 stroke-primary-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
                  : getIcon(restaurant.type).svg(
                      "size-5 stroke-primary-foreground"
                    )
              }
            </div>
            ${
              places.find((p) => p.id == restaurant.id)
                ? `<svg class="size-4 stroke-primary-foreground absolute top-3/4 left-2/3 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`
                : ""
            }
          </div>
        `,
        iconSize: [32.8, 40],
        iconAnchor: [16.4, 40],
        className: "bg-transparent",
        popupAnchor: [0, -40],
      })}
    >
      {children && <Popup closeButton={false}>{children}</Popup>}
    </Marker>
  );
}
