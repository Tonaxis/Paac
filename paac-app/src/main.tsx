import { RestaurantProvider } from "@/components/providers/restaurant-provider.tsx";
import { StorageProvider } from "@/components/providers/storage-provider.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "flag-icons/css/flag-icons.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18next.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RestaurantProvider>
        <StorageProvider>
          <App />
        </StorageProvider>
      </RestaurantProvider>
    </ThemeProvider>
  </StrictMode>
);
