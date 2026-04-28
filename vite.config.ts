// Vite 設定檔，負責載入 React 外掛與部署時的 base path。
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/React-TypeTypeScript-Vite-project/' : '/',
  plugins: [react()],
})
