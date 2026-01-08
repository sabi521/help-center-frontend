import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import webfontDownload from "vite-plugin-webfont-dl"; // 1. Import it

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/new/",
  plugins: [
    tailwindcss(),
    // 2. Add the font URLs here.
    // The plugin will download these so they aren't "external" anymore.
    webfontDownload([
      "https://sh.betuscdn.com/libs/css/fonts/kommissar-condensed.css",
      "https://sh.betuscdn.com/libs/css/fonts/roboto.css",
      "https://sh.betuscdn.com/libs/css/fonts/nexa.css",
    ]),
  ],
  build: {
    assetsInlineLimit: 15360,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        deposit: path.resolve(__dirname, "deposit.html"),
        bonus: path.resolve(__dirname, "bonus.html"),
        managingAccount: path.resolve(__dirname, "managing-account.html"),
      },
    },
  },
});
