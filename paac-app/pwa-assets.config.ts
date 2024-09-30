import {
  defineConfig,
  minimal2023Preset,
  Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: { apple: minimal2023Preset.apple } as Preset,
  images: ["public/paac.svg"],
});
