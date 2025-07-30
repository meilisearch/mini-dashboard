import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig(() => ({
  envPrefix: 'REACT_APP_',
  cacheDir: '.vite',
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  publicDir: 'public',
  server: {
    host: 'localhost',
    open: true,
    port: process.env.PORT || 3000,
  },
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  resolve: {
    alias: {
      // Add your code aliases here, like you would in jsconfig or tsconfig files if not already done
    },
  },
  optimizeDeps: {
    exclude: ['meilisearch'],
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
}))
