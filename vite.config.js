import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv, createFilter, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  setEnv(mode)
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      envPlugin(),
      devServerPlugin(),
      sourcemapPlugin(),
      buildPathPlugin(),
      basePlugin(),
      importPrefixPlugin(),
      htmlPlugin(mode),
      svgrPlugin(),
    ],
    optimizeDeps: {
      exclude: ['meilisearch'],
    },
    build: {
      rollupOptions: {
        external: ['meilisearch'],
      },
    },
  }
})

function setEnv(mode) {
  Object.assign(
    process.env,
    loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL'])
  )
  process.env.NODE_ENV ||= mode
  const { homepage } = JSON.parse(readFileSync('package.json', 'utf-8'))
  process.env.PUBLIC_URL ||= homepage
    ? `${
        homepage.startsWith('http') || homepage.startsWith('/')
          ? homepage
          : `/${homepage}`
      }`.replace(/\/$/, '')
    : ''
}

// Expose `process.env` environment variables to client code
function envPlugin() {
  return {
    name: 'env-plugin',
    config(_, { mode }) {
      const env = loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL'])
      return {
        define: Object.fromEntries(
          Object.entries(env).map(([key, value]) => [
            `process.env.${key}`,
            JSON.stringify(value),
          ])
        ),
      }
    },
  }
}

// Configure development server with HOST, SSL, and PORT support
function devServerPlugin() {
  return {
    name: 'dev-server-plugin',
    config(_, { mode }) {
      const { HOST, PORT, HTTPS, SSL_CRT_FILE, SSL_KEY_FILE } = loadEnv(
        mode,
        '.',
        ['HOST', 'PORT', 'HTTPS', 'SSL_CRT_FILE', 'SSL_KEY_FILE']
      )
      const https = HTTPS === 'true'
      return {
        server: {
          host: HOST || '0.0.0.0',
          port: parseInt(PORT || '3000', 10),
          open: true,
          ...(https &&
            SSL_CRT_FILE &&
            SSL_KEY_FILE && {
              https: {
                cert: readFileSync(resolve(SSL_CRT_FILE)),
                key: readFileSync(resolve(SSL_KEY_FILE)),
              },
            }),
        },
      }
    },
  }
}

// Configure sourcemap generation
function sourcemapPlugin() {
  return {
    name: 'sourcemap-plugin',
    config(_, { mode }) {
      const { GENERATE_SOURCEMAP } = loadEnv(mode, '.', ['GENERATE_SOURCEMAP'])
      return {
        build: {
          sourcemap: GENERATE_SOURCEMAP === 'true',
        },
      }
    },
  }
}

// Configure build output directory
function buildPathPlugin() {
  return {
    name: 'build-path-plugin',
    config(_, { mode }) {
      const { BUILD_PATH } = loadEnv(mode, '.', ['BUILD_PATH'])
      return {
        build: {
          outDir: BUILD_PATH || 'build',
        },
      }
    },
  }
}

// Configure base URL for deployment
function basePlugin() {
  return {
    name: 'base-plugin',
    config(_, { mode }) {
      const { PUBLIC_URL } = loadEnv(mode, '.', ['PUBLIC_URL'])
      return {
        base: PUBLIC_URL || '',
      }
    },
  }
}

// Resolve modules from node_modules with ~ prefix
function importPrefixPlugin() {
  return {
    name: 'import-prefix-plugin',
    config() {
      return {
        resolve: {
          alias: [{ find: /^~([^/])/, replacement: '$1' }],
        },
      }
    },
  }
}

// Transform SVG imports into React components
function svgrPlugin() {
  const filter = createFilter('**/*.svg')
  const postfixRE = /[?#].*$/s
  return {
    name: 'svgr-plugin',
    async transform(code, id) {
      if (filter(id)) {
        const { transform } = await import('@svgr/core')
        const { default: jsx } = await import('@svgr/plugin-jsx')
        const filePath = id.replace(postfixRE, '')
        const svgCode = readFileSync(filePath, 'utf8')
        const componentCode = await transform(svgCode, undefined, {
          filePath,
          caller: {
            previousExport: code,
            defaultPlugins: [jsx],
          },
        })
        const res = await transformWithEsbuild(componentCode, id, {
          loader: 'jsx',
        })
        return {
          code: res.code,
          map: null,
        }
      }
    },
  }
}

// Replace environment variables in index.html
function htmlPlugin(mode) {
  const env = loadEnv(mode, '.', ['REACT_APP_', 'NODE_ENV', 'PUBLIC_URL'])
  return {
    name: 'html-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match)
      },
    },
  }
}
