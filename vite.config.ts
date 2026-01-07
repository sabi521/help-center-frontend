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
    target: "esnext", // Generates smaller, modern JS code
    minify: "esbuild", // The modern, lightning-fast default
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        deposit: path.resolve(__dirname, "deposit.html"),
        bonus: path.resolve(__dirname, "bonus.html"),
        managingAccount: path.resolve(__dirname, "managing-account.html"),
      },
      output: {
        // Splits the code into smaller pieces to avoid one giant 7MB file
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
