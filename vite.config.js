import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'build',
    // Never ship source maps: they expose the original source code to anyone
    // opening the browser devtools on a production deployment.
    sourcemap: false,
  },
  esbuild: {
    loader: 'jsx',
    include: /(src|\.storybook)\/.*\.[jt]sx?($|\?)/,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
