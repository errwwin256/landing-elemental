import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // 👇 Make sure this matches your GitHub repo name
  base: "/landing-elemental/",
  plugins: [react(), tailwindcss()],
});
