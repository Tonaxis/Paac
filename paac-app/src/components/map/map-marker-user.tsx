import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

type MapMarkerUserProps = {
  children?: React.ReactNode;
  position: {
    lat: number;
    lon: number;
  };
};

export default function MapMarkerUser({
  children,
  position,
}: MapMarkerUserProps) {
  return (
    <Marker
      position={[position.lat, position.lon]}
      icon={L.divIcon({
        html: `
          <div class="relative pointer-events-none">
            <svg class="size-6 stroke-foreground event-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/></svg>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <div class="size-10 animate-[ping_1.5s_ease-out_infinite] opacity-80 bg-primary rounded-full"/>
            </div>
          </div>
            `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        className: "bg-transparent",
        popupAnchor: [0, -12],
      })}
    >
      {children && <Popup>{children}</Popup>}
    </Marker>
  );
}
