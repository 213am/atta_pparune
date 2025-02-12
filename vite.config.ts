import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: "0.0.0.0", // 모든 IP에서 접근 가능하도록 설정
    proxy: {
      "/api": {
        target: "http://112.222.157.156:5222", // 요청을 보낼 대상 서버
        changeOrigin: true, // Origin 헤더를 target으로 변경
        secure: false, // SSL 인증서 무시
      },
    },
  },
  // webSocket 연결을 위한 설정
  define: {
    global: "window",
  },
});
