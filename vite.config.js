import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Exclude folders that contain large binary assets or build outputs.
      // DesignIdeas/ PNGs can be locked by other apps on Windows, causing
      // Vite's FSWatcher to throw EBUSY and crash the dev server.
      ignored: ['**/DesignIdeas/**', '**/dist/**'],
    },
  },
})
