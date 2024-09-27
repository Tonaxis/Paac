import "@/assets/css/global.css";
import { useStorage } from "@/components/providers/storage-provider";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, Dish, Menu } from "@/models/menu";
import { useEffect, useState } from "react";

export function MenuCard() {
  const { place } = useStorage();
  const [menu, setMenu] = useState<Menu>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      async function getMenu() {
        const date = new Date();
        const response = await fetch(
          `/api/menus/${place?.dataset}/${place?.id}?date=${formatDate(date)}`
        );
        // const response = await fetch(
        //   `http://127.0.0.1:8080/menus/${place?.dataset}/${
        //     place?.id
        //   }?date=${formatDate(date)}`
        // );
        const data = await response.json();
        setMenu(data as Menu);

        setLoading(false);
      }

      getMenu();
    } else {
      setMenu({} as Menu);
    }
  }, [place]);

  function formatDate(date: Date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
