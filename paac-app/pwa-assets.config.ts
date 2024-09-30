import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  // preset: { apple: minimal2023Preset.apple } as Preset,
  preset: minimal2023Preset,
  images: ["public/paac.svg"],
});
