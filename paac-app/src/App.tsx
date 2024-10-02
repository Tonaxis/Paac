import "@/assets/css/global.css";
import { MenuCard } from "@/components/menu-card/menu-card";
import PlaceSelector from "@/components/place-selector/place-selector";
import { useStorage } from "@/components/providers/storage-provider";
import SettingsDialog from "@/components/settings/settings";
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
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  PencilOff,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { version } from "../package.json";

function App() {
  const { t } = useTranslation();
  const { places, setPlaces } = useStorage();
  const [dragging, setDragging] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

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
            {places.length} {t("selected_places")}
          </div>
          <p className="text-sm capitalize">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "full",
            }).format(date)}
          </p>
        </div>
        <Separator />
      </header>
      <div className="p-2 flex justify-between gap-2">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="p-0"
            onClick={() =>
              setDate((prev) => {
                const prevDate = new Date(new Date(prev).setHours(0, 0, 0, 0));
                return new Date(prevDate.getTime() - 24 * 60 * 60 * 1000);
              })
            }
          >
            <ChevronLeft />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-0"
            onClick={() => setDate(new Date(new Date().setHours(0, 0, 0, 0)))}
          >
            <Calendar />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-0"
            onClick={() =>
              setDate((prev) => {
                const prevDate = new Date(prev);
                prevDate.setMilliseconds(0);
                prevDate.setSeconds(0);
                prevDate.setMinutes(0);
                prevDate.setHours(0);

                return new Date(prevDate.getTime() + 24 * 60 * 60 * 1000);
              })
            }
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="flex items-center gap-2">
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
                    isDragDisabled={!dragging}
                  >
                    {(provided) => (
                      <div
                        className="max-w-xl w-full"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MenuCard
                          date={date}
                          restaurant={place}
                          dragging={dragging}
                        />
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
