---
name: cra-to-vite
overview: Migrate app/tooling from Create React App (`react-scripts`) to Vite while preserving existing CI/e2e expectations (port 3000, `build/` output), renaming all client env vars to `VITE_*`, switching unit tests to Vitest, and deferring Storybook migration until the Vite app is validated.
todos:
  - id: explore-readonly
    content: Run explore subagents (env, imports, storybook) and collect only actionable outputs.
    status: completed
  - id: phase-a-vite-bootstrap
    content: Add Vite tooling (vite.config + root index.html) and switch dev/build scripts while keeping CRA/Storybook working.
    status: completed
  - id: phase-b-import-paths
    content: Preserve existing src absolute imports via Vite paths/alias config (avoid rewriting imports).
    status: completed
  - id: phase-c-env-rename
    content: Rename all REACT_APP_* vars to VITE_* and update code, docs, and scripts (including start:ci).
    status: completed
  - id: phase-c-validate-env
    content: Update validate-env.js to check the new VITE_* variables and load .env files used by prestart/prebuild.
    status: completed
  - id: phase-d-eslint
    content: Drop react-app ESLint config and replace with React + Hooks recommended rules while keeping existing Airbnb/Prettier setup.
    status: completed
  - id: phase-e-vitest
    content: Replace CRA test runner with Vitest; configure jsdom/globals and update the test script (local only).
    status: completed
  - id: phase-f-validate
    content: Run smoke checks via shell subagent (lint, dev, build, preview, vitest) and optionally minimal Cypress spec; fix issues found.
    status: completed
  - id: phase-g-storybook-vite
    content: After app is validated, align Storybook versions and migrate Storybook from CRA/webpack to Vite builder; validate.
    status: completed
  - id: phase-h-remove-cra
    content: Remove CRA tooling (react-scripts, CRA Storybook preset, webpack-only deps) and update docs accordingly.
    status: completed
isProject: false
---

# CRA → Vite migration (keep CI/Cypress stable)

## Constraints / non-goals

- **Env**: rename *all* client-facing vars `REACT_APP_`* → `VITE_`* (and code to `import.meta.env.`*).
- **ESLint**: drop CRA `react-app` config; keep Airbnb/Prettier; add React+Hooks defaults as needed.
- **Unit tests**: move to **Vitest**; run locally only (CI stays as-is today).
- **Storybook**: **do not migrate until after** Vite dev/build + lint + vitest + (ideally) Cypress are validated.
- **Packaging/CI**: keep **port 3000** and keep build output dir `build/` (required by `[.github/workflows/publish-build.yml](.github/workflows/publish-build.yml)` and Meilisearch packaging).
- **Deployment**: none; assume root paths (no non-root `base` requirement).

## Subagent-first execution strategy (to keep main context clean)

Run each block as a separate subagent session; subagent returns *only* (a) file list touched, (b) failing command + 20-line excerpt, (c) next action.

- **Explore subagents (readonly)**
  - `explore-env`: enumerate `process.env.`* usage + `.env` keys + docs references; output rename map.
  - `explore-imports`: confirm absolute-import strategy (current `jsconfig.json` baseUrl=`src`) and recommend Vite resolver approach.
  - `explore-storybook`: identify Storybook package/version alignment issues; propose Vite-builder migration steps (but do not apply until final phase).
- **Shell subagents** (after edits)
  - `shell-smoke`: run `yarn lint`, `yarn dev` (start + basic page load), `yarn build`, `yarn preview`, `yarn test` (vitest). Keep logs out of main context.
  - `shell-cypress` (optional but recommended): run the lightest CI-parity spec(s) locally (at least `cy:run:test-no-meilisearch`).

## Phase A — Add Vite without deleting CRA (app runs on Vite first)

**Why**: keep Storybook (CRA preset) working while we validate Vite app.

- Add deps: `vite`, `@vitejs/plugin-react` (or `...-swc`), plus a jsconfig/tsconfig paths plugin (see Phase B).
- Add `[vite.config.js](vite.config.js)` with:
  - dev server **host + port** for CI/Cypress parity
  - build output `build/` (publish workflow + Meilisearch packaging expect it)

Concept config shape:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { host: true, port: 3000, strictPort: true },
  preview: { host: true, port: 3000, strictPort: true },
  build: { outDir: 'build' },
})
```

- Create root `[index.html](index.html)` (Vite entry) by porting `[public/index.html](public/index.html)`:
  - replace CRA `%PUBLIC_URL%` with root-absolute `/...` (no non-root deploy requirement)
  - add module entry script

Concept HTML shape:

```html
<div id="root"></div>
<script type="module" src="/src/index.js"></script>
```

- Update `[package.json](package.json)` scripts to run Vite (keep `prestart`/`prebuild` as-is):
  - `start` → `vite`
  - `start:ci` → `vite --host 0.0.0.0 --port 3000` (and set `VITE_MEILI_SERVER_ADDRESS=...`)
  - `build` → `vite build`
  - add `preview` → `vite preview --host 0.0.0.0 --port 3000`
  - keep `react-scripts` installed for now (Storybook CRA preset dependency)

## Phase B — Absolute imports: preserve current `src/` base imports

Current app relies on CRA absolute imports via `[jsconfig.json](jsconfig.json)` (`baseUrl: "src"`) e.g. `[src/index.js](src/index.js)` imports `theme`/`App`/`context/...`.

- Preferred: keep import style unchanged by using a paths plugin.
- If `vite-tsconfig-paths` doesn’t honor `jsconfig.json` baseUrl alone, adjust `jsconfig.json` minimally (editor + Vite):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "*": ["src/*"] }
  }
}
```

(Do **not** rewrite imports across the codebase.)

## Phase C — Env rename + code updates (`REACT_APP_`* → `VITE_`*)

Known locations:

- `[src/config.js](src/config.js)`: `REACT_APP_MEILI_SERVER_ADDRESS`, `process.env.NODE_ENV`
- `[src/hooks/useNewsletter.js](src/hooks/useNewsletter.js)`: Hubspot vars + `process.env.NODE_ENV`
- `[.env](.env)`, `[README.md](README.md)`, `[package.json](package.json)` (`start:ci`), `[validate-env.js](validate-env.js)`

Target code shape examples:

```js
// src/config.js
const baseUrl =
  import.meta.env.VITE_MEILI_SERVER_ADDRESS ||
  (import.meta.env.DEV ? 'http://0.0.0.0:7700' : window.location.origin)
```

```js
// src/hooks/useNewsletter.js
const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID
```

- Update `[validate-env.js](validate-env.js)` to reference the new `VITE_*` variables and *load `.env` files** so `prestart`/`prebuild` work reliably (not just shell-exported env).

## Phase D — ESLint: remove CRA `react-app` config

Current `.eslintrc.json` extends `"react-app"` ([.eslintrc.json](.eslintrc.json)).

- Remove `react-app` from `extends`.
- Add React defaults explicitly (minimal):
  - `plugin:react/recommended`
  - `plugin:react-hooks/recommended` (add `eslint-plugin-react-hooks` devDep)
- Keep existing Airbnb + a11y + cypress + prettier integration.
- Ensure ESLint understands `import.meta` (may require `parserOptions.sourceType: "module"` if lint complains).

## Phase E — Unit tests: switch to Vitest (local only)

- Add dev deps: `vitest` (+ `jsdom` if we want CRA-like DOM environment).
- Configure Vitest to support Jest-style globals used by `[src/utils/extractFirstImageUrl.test.js](src/utils/extractFirstImageUrl.test.js)`:

```js
// in vite.config.js
test: { globals: true, environment: 'jsdom' }
```

- Update `package.json` `test` script → `vitest` (optionally `vitest run` for non-watch).
- No CI workflow changes needed (CI doesn’t run `yarn test` today).

## Phase F — Validate Vite app before touching Storybook

Run via **shell subagent** (keep logs out of main context):

- `yarn lint && yarn prettier-check`
- `yarn start` (confirm app loads on `http://localhost:3000`)
- `yarn build` (output to `build/`; smoke serve with `yarn preview`)
- `yarn test` (vitest)
- Optional CI-parity: `yarn cy:run:test-no-meilisearch` (and/or full suite if Meilisearch available)

## Phase G — Migrate Storybook to Vite (only after Phase F is green)

Current Storybook is CRA/webpack-based via `[.storybook/main.js](.storybook/main.js)` (`@storybook/preset-create-react-app`, `@storybook/react-webpack5`).

- Align Storybook package versions (your `package.json` currently mixes 8.x + `@storybook/react-webpack5` 9.x; fix before migrating builder).
- Switch framework to Vite (`@storybook/react-vite`), remove CRA preset from addons.
- Ensure Storybook inherits Vite alias/env behavior (reuse `vite.config.js` where possible).
- Validate: `yarn storybook` and `yarn build-storybook`.

## Phase H — Drop CRA tooling (final cleanup)

After Storybook is on Vite and green:

- Remove `react-scripts` + `@storybook/preset-create-react-app` + webpack-only leftovers if unused (e.g. `babel-loader`).
- Remove CRA-only scripts (`eject`) and CRA-specific `resolutions` entries that target `react-scripts/`* if no longer needed.
- Update docs: `[README.md](README.md)` (env var names, build output, docker run env flag).

## Unresolved questions

- None.

