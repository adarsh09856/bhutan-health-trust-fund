import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || process.env.NITRO_PORT || 6060);

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxDev: false,
  },
  server: {
    port: PORT,
    host: "0.0.0.0",
  },
  preview: {
    port: PORT,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "pg-native": path.resolve(__dirname, "src/lib/stubs/pg-native.ts"),
    },
    dedupe: ["react", "react-dom"],
  },
  ssr: {
    external: ["pg", "pg-native"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    tailwindcss(),
    nitro({
      devServer: { port: PORT },
    }),
  ],
});
