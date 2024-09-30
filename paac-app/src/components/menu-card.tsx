import "@/assets/css/global.css";
import { useStorage } from "@/components/providers/storage-provider";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, Dish, Menu } from "@/models/menu";
import { fetchMenu } from "@/services/api";
import { formatDate } from "@/utils/utils";
import { useEffect, useState } from "react";

export function MenuCard() {
  const { place } = useStorage();
  const [menu, setMenu] = useState<Menu>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      async function getMenu() {
        if (!place) return;
        const data = await fetchMenu(place.dataset, place.id);
        setMenu(data as Menu);

        setLoading(false);
      }

      getMenu();
    } else {
      setMenu({} as Menu);
    }
  }, [place]);

  return (
    <div className="border-2 border-foreground rounded p-5">
      {loading ? (
        <Skeleton className="h-96 w-96 rounded-xl bg-foreground/10" />
      ) : menu?.date ? (
        <>
          <h1 className="text-center capitalize font-bold text-xl text-primary">
            {menu?.moment}
          </h1>
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
      ) : (
        <p>Aucun menu trouvé pour le {formatDate(new Date())}</p>
      )}
    </div>
  );
}
