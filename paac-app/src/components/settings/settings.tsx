import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
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
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import i18n from "@/i18next";
import { cn } from "@/lib/utils";
import { changeLanguage } from "i18next";

import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsDialog() {
  const { t } = useTranslation();
  const { places, setPlaces, favorites, setFavorites, settings, setSetting } =
    useStorage();

  return (
    <Dialog>
      <DialogTrigger>
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>{t("settings")}</p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="relative divide-y-2">
          <div className="flex justify-between py-4">
            <div className="max-w-72">
              <h3 className="font-medium">{t("theme")} :</h3>
              <p className="text-xs font-thin">{t("theme_desc")}</p>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div className="max-w-72">
              <h3 className="font-medium">{t("auto_refresh")} :</h3>
              <p className="text-xs font-thin">{t("auto_refresh_desc")}</p>
            </div>
            <div className="flex items-center">
              <Switch
                onCheckedChange={(checked) =>
                  setSetting("autoRefresh", checked)
                }
                checked={settings.autoRefresh}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between py-4">
              <div className="max-w-72">
                <h3 className="font-medium">{t("auto_refresh_interval")} :</h3>
                <p className="text-xs font-thin">
                  {t("auto_refresh_interval_desc")}
                </p>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  className="w-24"
                  defaultValue={settings.refreshInterval || 60}
                  onInput={(interval) =>
                    setSetting(
                      "refreshInterval",
                      Math.max(
                        1,
                        Math.min(300, interval.currentTarget.valueAsNumber)
                      )
                    )
                  }
                  value={settings.refreshInterval || 60}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Slider
                onValueChange={(interval) =>
                  setSetting("refreshInterval", interval)
                }
                defaultValue={[settings.refreshInterval || 60]}
                min={1}
                max={300}
                step={1}
              />
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div className="max-w-72">
              <h3 className="font-medium">{t("language")} :</h3>
              <p className="text-xs font-thin">{t("language_desc")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="p-0 h-10"
                onClick={() => changeLanguage("fr")}
              >
                <span
                  className={cn(
                    "h-8 w-10 fi fi-fr rounded-md transition-opacity",
                    i18n.language !== "fr" && "opacity-50 hover:opacity-100",
                    i18n.language === "fr" && "opacity-100 outline"
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-10"
                onClick={() => changeLanguage("en")}
              >
                <span
                  className={cn(
                    "h-8 w-10 fi fi-gb rounded-md transition-opacity",
                    i18n.language !== "en" && "opacity-50 hover:opacity-100",
                    i18n.language === "en" && "opacity-100 outline"
                  )}
                />
              </Button>
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div className="max-w-72">
              <h3 className="font-medium">{t("clear_favorites")} :</h3>
              <p className="text-xs font-thin">{t("clear_favorites_desc")}</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="destructive"
                onClick={() => setFavorites([])}
                disabled={!favorites?.length}
              >
                {t("clear")}
              </Button>
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div className="max-w-72">
              <h3 className="font-medium">{t("remove_selected_places")} :</h3>
              <p className="text-xs font-thin">
                {t("remove_selected_places_desc")}
              </p>
            </div>
            <div className="flex items-center">
              <Button
                variant="destructive"
                onClick={() => setPlaces([])}
                disabled={!places?.length}
              >
                {t("remove")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
