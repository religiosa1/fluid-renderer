import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    proxy: {
      "/api/render": {
        target: "http://localhost:5208",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "../FluidRendererApi/wwwroot",
    emptyOutDir: true,
  },
});
