import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/new/",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        deposit: path.resolve(__dirname, "deposit.html"),
        bonus: path.resolve(__dirname, "bonus.html"),
        // payouts: path.resolve(__dirname, "payouts.html"),
      },
    },
  },
});
