import Map from "@/components/map/map";
import MapMarker from "@/components/map/map-marker";
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
import { Check, Info, MapPin, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type PlaceInfoProps = {
  restaurant: Restaurant;
};

export default function PlaceInfo({ restaurant }: PlaceInfoProps) {
  const { t } = useTranslation();

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
                      key={index}
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
                      key={index}
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
                      key={index}
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
          <div className="overflow-hidden h-80 w-full">
            <Map
              position={{
                lat: parseFloat(restaurant.lat),
                lon: parseFloat(restaurant.lon),
              }}
            >
              <MapMarker
                restaurant={restaurant}
                position={{
                  lat: parseFloat(restaurant.lat),
                  lon: parseFloat(restaurant.lon),
                }}
              >
                <p>{restaurant.title}</p>
              </MapMarker>
            </Map>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
