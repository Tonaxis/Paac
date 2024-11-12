import "@/assets/css/global.css";
import PlaceInfo from "@/components/place-info/place-info";
import { useStorage } from "@/components/providers/storage-provider";
import TypeIcon from "@/components/type-icon/type-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Category, Dish, Menu } from "@/models/menu";
import Restaurant from "@/models/restaurant";
import { fetchMenu } from "@/services/api";
import { GripVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type MenuCardProps = {
  date: Date;
  restaurant: Restaurant;
  dragging?: boolean;
};

export function MenuCard({
  date,
  restaurant,
  dragging = false,
}: MenuCardProps) {
  const { removePlace, settings } = useStorage();
  const { t } = useTranslation();
  const [menu, setMenu] = useState<Menu>();
  const [moment, setMoment] = useState("");
  const [loading, setLoading] = useState(true);
  const [silentLoading, setSilentLoading] = useState(false);

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant, date, moment]);

  useEffect(() => {
    let intervalId = null;
    if (settings.autoRefresh) {
      intervalId = setInterval(() => {
        if (!loading && !silentLoading) {
          getMenu(true);
        }
      }, 1000 * Math.max(settings.refreshInterval || 60, 1));
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.autoRefresh]);

  async function getMenu(silentLoading = false) {
    if (!silentLoading) setLoading(true);
    else setSilentLoading(true);

    const data = await fetchMenu(
      restaurant.dataset,
      restaurant.id,
      date,
      moment
    );
    setMenu(data as Menu);

    if (!silentLoading) setLoading(false);
    else setSilentLoading(false);
  }

  return (
    <div className="max-w-xl w-full border-2 border-foreground rounded p-5">
      {dragging ? (
        <div className="flex gap-2 items-center font-medium">
          <GripVertical className="text-primary" />
          <div className="flex gap-2 items-center font-medium">
            <TypeIcon name={restaurant.type} /> {restaurant.title}
          </div>
          <Button
            variant="ghost"
            className="ml-auto"
            onClick={() => removePlace(restaurant)}
          >
            <Trash className=" stroke-destructive" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center font-medium">
              <TypeIcon name={restaurant.type} /> {restaurant.title}
              {silentLoading && <div className="loading-spinner" />}
            </div>
            <PlaceInfo restaurant={restaurant} />
          </div>
          {menu && menu.date ? (
            <>
              <div className="flex justify-between items-center">
                {menu.availables_moments.map((moment: string) => (
                  <Button
                    key={moment}
                    variant="ghost"
                    className={cn(
                      "capitalize font-bold text-xl p-0 h-fit mt-1",
                      menu.moment === moment
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setMoment(moment)}
                  >
                    {moment}
                  </Button>
                ))}
              </div>
              <Separator className="mt-2" />
              <div>
                {menu?.categories?.map((category: Category) => (
                  <div key={category.name} className="mt-4">
                    <div>
                      <h2 className="uppercase font-bold text-primary">
                        {category.name}
                      </h2>
                    </div>
                    <ul>
                      {category.dishes.map((dish: Dish) => (
                        <li key={dish.name} className="text-sm capitalize">
                          {dish.name.toLowerCase()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : !loading ? (
            <>
              <Separator className="my-2" />
              <p className="text-center text-sm">{t("no_menu_found")}</p>
            </>
          ) : (
            <>
              <Skeleton className="h-7 w-60 mt-2 rounded-xl bg-foreground/20" />
              <Separator className="my-2" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-12 rounded-xl bg-foreground/20" />
                <Skeleton className="h-4 w-24 rounded-xl bg-foreground/20" />
                <Skeleton className="h-4 w-32 rounded-xl bg-foreground/20" />
                <Skeleton className="h-4 w-20 rounded-xl bg-foreground/20" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
