import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

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
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    tailwindcss(),
    nitro({
      config: {
        devServer: { port: PORT },
      },
    }),
  ],
});
