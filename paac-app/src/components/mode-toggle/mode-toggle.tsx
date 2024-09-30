import { useTheme } from "@/components/providers/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <Select onValueChange={setTheme} value={theme}>
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
      </SelectContent>
    </Select>
  );
}
