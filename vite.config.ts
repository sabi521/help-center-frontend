import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import webfontDownload from "vite-plugin-webfont-dl"; // 1. Import it

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/new/",
  plugins: [tailwindcss()],
  build: {
    assetsInlineLimit: 15360,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        deposit: path.resolve(__dirname, "deposit.html"),
        bonus: path.resolve(__dirname, "bonus.html"),
        managingAccount: path.resolve(__dirname, "managing-account.html"),
        emptySearch: path.resolve(__dirname, "empty-search.html"),
        searchResults: path.resolve(__dirname, "search-results.html"),
        lrWgEmptySearch: path.resolve(__dirname, "lr-wg-empty-search.html"),
        technicalTroubleshoot: path.resolve(
          __dirname,
          "technical-troubleshoot.html"
        ),
        termsConditions: path.resolve(__dirname, "terms-conditions.html"),
      },
    },
  },
});
