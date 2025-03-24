import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(function(zavatra){
  const config = {
    plugins: [
      tailwindcss(),
      eslint({
        include: ["src//*.js"],
        exclude: ["node_modules/", "dist/**"],
        overrideConfig: {}, // You can add any additional config here
        overrideConfigFile: "eslint.config.js", // Point to your flat config file
      }),
    ],
    build: {
      target: "modules",
    },
  }

  if (zavatra.command === "build") {
    config.build.cssMinify = true
    config.build.minify = "esbuild"
    console.log("Ici")
  } else {
    config.build.cssMinify = false
    config.build.minify = false
  }
  return config
},
)
