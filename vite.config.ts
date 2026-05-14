import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Mi Paella',
        short_name: 'Paella',
        description: 'Guía de paellas tradicionales — recetas, ingredientes y modos de cocción',
        theme_color: '#111118',
        background_color: '#111118',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/mi-paella/',
        scope: '/mi-paella/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  base: '/mi-paella/',
})
