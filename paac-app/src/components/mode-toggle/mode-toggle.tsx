import { useStorage } from "@/components/providers/storage-provider";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, Moon, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { settings, setSetting } = useStorage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= 25) {
      setSetting("bkth", true);
      setTheme("blacker");
    }
  }, [count, setSetting, setTheme]);

  return (
    <Select
      onValueChange={setTheme}
      value={theme}
      onOpenChange={(v) => {
        if (v && theme === "dark") setCount(count + 1);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className={
            ":hidden transition-colors data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground no-checkmark"
          }
          value="light"
        >
          <div className="flex gap-2">
            <Sun /> <p>{t("light")}</p>
          </div>
        </SelectItem>
        <SelectItem
          className={
            "transition-colors data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground no-checkmark"
          }
          value="dark"
        >
          <div className="flex gap-2">
            <Moon /> <p>{t("dark")}</p>
          </div>
        </SelectItem>
        <SelectItem
          className={
            "transition-colors data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground no-checkmark"
          }
          value="system"
        >
          <div className="flex gap-2">
            <Monitor /> <p>{t("system")}</p>
          </div>
        </SelectItem>
        {settings.bkth && (
          <SelectItem
            className={
              "transition-colors data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground no-checkmark"
            }
            value="blacker"
          >
            <div className="flex gap-2">
              <MoonStar /> <p>{t("blacker")}</p>
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
