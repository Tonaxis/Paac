import { ModeToggle } from "@/components/mode-toggle";
import { useStorage } from "@/components/providers/storage-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Settings } from "lucide-react";

export default function SettingsDialog() {
  const { places, setPlaces, favorites, setFavorites } = useStorage();

  return (
    <Dialog>
      <DialogTrigger>
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Parammètres</p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="divide-y-2">
          <div className="flex justify-between py-2">
            <div>
              <h3 className="font-medium">Thème :</h3>
              <p className="text-sm">L'apparence de l'application</p>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>

          <div className="flex justify-between py-2">
            <div>
              <h3 className="font-medium">Vider les favoris :</h3>
              <p className="text-sm">Supprimer tous les favoris</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="destructive"
                onClick={() => setFavorites([])}
                disabled={!favorites?.length}
              >
                Vider
              </Button>
            </div>
          </div>

          <div className="flex justify-between py-2">
            <div>
              <h3 className="font-medium">Supprimer la sélection :</h3>
              <p className="text-sm">Retirer tous les lieux selectionnés</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="destructive"
                onClick={() => setPlaces([])}
                disabled={!places?.length}
              >
                Retirer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
