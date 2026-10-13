import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Keyboard-1-Octave/',

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Keyboard 1 Octave',
        short_name: 'Keyboard',
        description: 'Keyboard 1 Octave - 3D Viewer',

        theme_color: '#111111',
        background_color: '#111111',

        display: 'standalone',
        orientation: 'landscape',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,glb,wav}'
        ],
        cleanupOutdatedCaches: true
      }
    })
  ]
})
