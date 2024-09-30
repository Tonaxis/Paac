import "@/assets/css/global.css";
import { MenuCard } from "@/components/menu-card";
import PlaceSelector from "@/components/place-selector";
import { useStorage } from "@/components/providers/storage-provider";
import SettingsDialog from "@/components/settings";
import TypeIcon from "@/components/type-icon";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "@/models/menu";
import PWABadge from "@/PWABadge";
import { fetchMenu } from "@/services/api";
import { useEffect, useState } from "react";
import { version } from "../package.json";

function App() {
  const { place } = useStorage();
  const [menu, setMenu] = useState<Menu>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      async function getMenu() {
        if (place) {
          const data = await fetchMenu(place.dataset, place.id);
          setMenu(data as Menu);

          setLoading(false);
        }
      }

      getMenu();
    } else {
      setMenu({} as Menu);
      setLoading(false);
    }
  }, [place]);

  return (
    <div>
      <header>
        <div className="h-8 flex px-2 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img className="size-6" src="/paac.svg" alt="PAAC logo" />
            <h1 className="text-xl leading-none font-black italic text-primary">
              PAAC
            </h1>
            <p>v{version}</p>
          </div>
          <div>
            <p className="text-sm">@Tonaxis</p>
          </div>
        </div>
        <Separator />
        <div className="px-4 py-4">
          <div className="text-lg font-medium">
            {place ? (
              <div className="flex gap-2 items-center">
                <TypeIcon name={place.type} /> {place.title}
              </div>
            ) : (
              "Lieu de restauration non sélectionné"
            )}
          </div>
          {loading ? (
            <Skeleton className="h-5 w-32 rounded-md bg-foreground/10" />
          ) : (
            <p className="text-sm capitalize">
              {menu
                ? new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(menu.date))
                : "Aucun menu trouvé à cette date"}
            </p>
          )}
        </div>
        <Separator />
      </header>
      <div className="p-2 flex justify-end gap-2">
        <PlaceSelector />
        <SettingsDialog />
      </div>
      <main className="p-2 flex items-center justify-center">
        <MenuCard />
      </main>
      <PWABadge />
    </div>
  );
}

export default App;
