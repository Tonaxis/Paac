import getIcon from "@/components/type-icon/icons";
import TypeIcon from "@/components/type-icon/type-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Restaurant from "@/models/restaurant";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Info, MapPin, X } from "lucide-react";
import "lucide-static/font/lucide.css";
import arrowRightIcon from "lucide-static/icons/arrow-right.svg";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type PlaceInfoProps = {
  restaurant: Restaurant;
};

export default function PlaceInfo({ restaurant }: PlaceInfoProps) {
  const { t } = useTranslation();

  const mapRef = useRef(null);

  return (
    <Dialog>
      <DialogTrigger>
        <Info />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="space-y-1">
            <p className="flex gap-2 items-center font-medium">
              <TypeIcon name={restaurant.type} /> {restaurant.title}
            </p>
            <p className="text-sm font-light">{restaurant.short_desc}</p>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <div className="flex gap-2 items-center pb-2">
              <MapPin />
              <p>{restaurant.location}</p>
            </div>
          </div>
          <Separator />
          <div className="relative max-w-[calc(100vw-3rem)] overflow-x-auto">
            <Table>
              <TableCaption>{t("opening_periods")}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-20"></TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 0 && "bg-foreground/10"
                    )}
                  >
                    {t("monday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 1 && "bg-foreground/10"
                    )}
                  >
                    {t("tuesday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 2 && "bg-foreground/10"
                    )}
                  >
                    {t("wednesday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 3 && "bg-foreground/10"
                    )}
                  >
                    {t("thursday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 4 && "bg-foreground/10"
                    )}
                  >
                    {t("friday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 5 && "bg-foreground/10"
                    )}
                  >
                    {t("saturday").slice(0, 3)}.
                  </TableHead>
                  <TableHead
                    className={cn(
                      "px-1 text-center",
                      new Date().getUTCDay() - 1 === 6 && "bg-foreground/10"
                    )}
                  >
                    {t("sunday").slice(0, 3)}.
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="max-w-20">{t("morning")}</TableCell>
                  {restaurant.opening.split(",").map((day, index) => (
                    <TableCell
                      className={cn(
                        new Date().getUTCDay() - 1 === index &&
                          "bg-foreground/10"
                      )}
                    >
                      {parseInt(day[0]) ? (
                        <Check className="stroke-primary" />
                      ) : (
                        <X />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="max-w-20">{t("lunch")}</TableCell>
                  {restaurant.opening.split(",").map((day, index) => (
                    <TableCell
                      className={cn(
                        new Date().getUTCDay() - 1 === index &&
                          "bg-foreground/10"
                      )}
                    >
                      {parseInt(day[1]) ? (
                        <Check className="stroke-primary" />
                      ) : (
                        <X />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="max-w-20">{t("dinner")}</TableCell>
                  {restaurant.opening.split(",").map((day, index) => (
                    <TableCell
                      className={cn(
                        new Date().getUTCDay() - 1 === index &&
                          "bg-foreground/10"
                      )}
                    >
                      {parseInt(day[2]) ? (
                        <Check className="stroke-primary" />
                      ) : (
                        <X />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <svg width="24" height="24" fill="none" stroke="red">
            <use href={arrowRightIcon} />
          </svg>
          <div className="overflow-hidden h-80 w-full">
            <MapContainer
              center={[
                parseFloat(restaurant.lat) || 0,
                parseFloat(restaurant.lon) || 0,
              ]}
              zoom={16}
              ref={mapRef}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  parseFloat(restaurant.lat),
                  parseFloat(restaurant.lon),
                ]}
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
                        class="fill-primary"
                        d="M82 41.25C82 64.0317 67.0909 88.75 41 100C14.9091 88.75 0 64.0317 0 41.25C0 18.4683 18.3563 0 41 0C63.6437 0 82 18.4683 82 41.25Z"
                      />
                      </svg>
                        <div class="absolute top-[6.4px] left-[6.4px] font-medium z-50">
                          <img class="size-5 stroke-primary-foreground event-none" src="${
                            getIcon(restaurant.type).staticUri
                          }" alt="" type="image/svg+xml" />
                        </div>
                      </div>
                  `,
                  iconSize: [32.8, 40],
                  iconAnchor: [16.4, 40],
                  className: "bg-transparent",
                  popupAnchor: [0, -40],
                })}
              >
                <Popup autoClose={true}>
                  <p className="flex gap-2 items-center font-medium">
                    {restaurant.title}
                  </p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
