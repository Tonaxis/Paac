import "@/assets/css/global.css";
import { MenuCard } from "@/components/menu-card";
import PlaceSelector from "@/components/place-selector";
import { useStorage } from "@/components/providers/storage-provider";
import SettingsDialog from "@/components/settings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import PWABadge from "@/PWABadge";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Pencil, PencilOff } from "lucide-react";
import { useState } from "react";
import { version } from "../package.json";

function App() {
  const { places, setPlaces } = useStorage();
  const [dragging, setDragging] = useState(false);
  // const [menu, setMenu] = useState<Menu>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (place) {
  //     async function getMenu() {
  //       if (place) {
  //         const data = await fetchMenu(place.dataset, place.id);
  //         setMenu(data as Menu);

  //         setLoading(false);
  //       }
  //     }

  //     getMenu();
  //   } else {
  //     setMenu({} as Menu);
  //     setLoading(false);
  //   }
  // }, [place]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(places);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaces(items);
  }

  return (
    <div>
      <header>
        <div className="h-8 flex px-2 items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img className="size-6" src="/paac.svg" alt="PAAC logo" />
            <h1 className="text-xl leading-none font-black italic text-primary">
              PAAC
            </h1>
            <p className="text-sm">v{version}</p>
          </div>
          <div>
            <p className="text-sm">@Tonaxis</p>
          </div>
        </div>
        <Separator />
        <div className="px-4 py-4">
          <div className="text-lg font-medium">
            {places.length} lieux sélectionnés
          </div>
          <p className="text-sm capitalize">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "full",
            }).format(new Date())}
          </p>
        </div>
        <Separator />
      </header>
      <div className="p-2 flex justify-end gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="p-0"
          onClick={() => setDragging(!dragging)}
        >
          {dragging ? <PencilOff /> : <Pencil />}
        </Button>
        <PlaceSelector />
        <SettingsDialog />
      </div>

      <main>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "relative w-full p-2 flex flex-wrap justify-center",
                  !dragging && "gap-8",
                  dragging && "gap-2"
                )}
              >
                {places?.map((place, index) => (
                  <Draggable
                    key={place.id}
                    draggableId={place.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="max-w-xl w-full"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MenuCard restaurant={place} dragging={dragging} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      <PWABadge />
    </div>
  );
}

export default App;
