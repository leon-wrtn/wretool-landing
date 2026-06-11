import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// wretool 랜딩 — 정적 SPA 빌드. Vercel/Netlify/정적 호스팅 모두 호환.
export default defineConfig({
  plugins: [react()],
});
