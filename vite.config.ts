import fs from "node:fs"
import { resolve } from "node:path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import unfonts from "unplugin-fonts/vite"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import eslintPlugin from "vite-plugin-eslint"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    https:
      mode === "development" &&
      fs.existsSync("ssl/key.pem") &&
      fs.existsSync("ssl/cert.pem")
        ? {
            key: fs.readFileSync("ssl/key.pem"),
            cert: fs.readFileSync("ssl/cert.pem"),
          }
        : undefined,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/app",
      generatedRouteTree: "./src/routes.gen.ts",
      quoteStyle: "double",
      semicolons: false,
    }),
    react(),
    svgr(),
    unfonts({
      google: {
        families: [
          {
            name: "Space Grotesk",
            styles: "wght@400;500;600;700",
          },
          {
            name: "DM Sans",
            styles: "opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700",
          },
          {
            name: "Outfit",
            styles: "wght@600;700",
          },
        ],
        display: "swap",
      },
      custom: {
        families: [
          {
            name: "Geist",
            src: "./fonts/geist-sans/*.woff2",
          },
          {
            name: "Geist Mono",
            src: "./fonts/geist-mono/*.woff2",
          },
        ],
      },
    }),
    checker({
      typescript: true,
      overlay: false,
    }),
    eslintPlugin({ cache: false }),
  ],
}))
