import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// wretool 랜딩 — 정적 SPA 빌드. Vercel/Netlify/GitHub Pages 모두 호환.
// base '/'(절대) 대신 './'(상대)로 두면 루트 배포(Vercel)와
// 서브패스 배포(GitHub Pages: /<repo>/) 양쪽에서 에셋 경로가 깨지지 않는다.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
