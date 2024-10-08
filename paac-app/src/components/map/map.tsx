import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

type MapProps = {
  children?: React.ReactNode;
  position: {
    lat: number;
    lon: number;
  };
};

export default function Map({ children, position }: MapProps) {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[position.lat, position.lon]}
      zoom={16}
      ref={mapRef}
      className="w-full h-full bg-background"
    >
      <TileLayer
        className="map-layer"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
