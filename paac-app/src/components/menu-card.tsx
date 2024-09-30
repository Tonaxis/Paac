import "@/assets/css/global.css";
import TypeIcon from "@/components/type-icon";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, Dish, Menu } from "@/models/menu";
import Restaurant from "@/models/restaurant";
import { fetchMenu } from "@/services/api";
import { GripVertical } from "lucide-react";
import { useEffect, useState } from "react";

type MenuCardProps = {
  restaurant: Restaurant;
  dragging?: boolean;
};

export function MenuCard({ restaurant, dragging = false }: MenuCardProps) {
  const [menu, setMenu] = useState<Menu>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMenu() {
      const data = await fetchMenu(restaurant.dataset, restaurant.id);
      setMenu(data as Menu);

      setLoading(false);
    }

    getMenu();
  }, [restaurant]);

  return (
    <div className="max-w-xl w-full border-2 border-foreground rounded p-5">
      {dragging ? (
        <div className="flex gap-2 items-center font-medium">
          <GripVertical className="text-primary" />
          <div className="flex gap-2 items-center font-medium">
            <TypeIcon name={restaurant.type} /> {restaurant.title}
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center font-medium">
            <TypeIcon name={restaurant.type} /> {restaurant.title}
          </div>
          {menu && menu.date ? (
            <>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold capitalize">
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(menu.date))}
                </p>
                <p className="text-center capitalize font-bold text-xl text-primary">
                  {menu?.moment}
                </p>
              </div>
              <Separator className="mt-2" />
              <div>
                {menu?.categories?.map((category: Category) => (
                  <div key={category.name} className="mt-4">
                    <div>
                      <h2 className="uppercase font-medium text-primary underline">
                        {category.name}
                      </h2>
                    </div>
                    <ul>
                      {category.dishes.map((dish: Dish) => (
                        <li key={dish.name} className="text-sm">
                          {dish.name}
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
              <p className="text-center text-sm">Aucun menu trouvé</p>
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
