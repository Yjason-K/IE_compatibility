import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      targets: ['IE >= 11'],
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'react-app-polyfill/ie11',
        'react-app-polyfill/stable',
        'core-js/stable',
      ]
    }),
    react()
  ],
})
