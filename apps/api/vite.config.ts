import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT || "4000"),
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
      initAppOnBoot: true,
      exportName: "api",
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
});
