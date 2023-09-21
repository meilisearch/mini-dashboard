<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/logo.svg" alt="Meilisearch logo" width="200" height="200" />
</p>

<h1 align="center">Mini Dashboard</h1>

---

🚨 IMPORTANT NOTICE: Reduced Maintenance & Support 🚨

*Dear Community,*

*We'd like to share some updates regarding the future maintenance of this repository:*

*Our team is small, and our availability will be reduced in the upcoming times. As such, response times might be slower, and we will not be accepting enhancements for this repository moving forward.*

*If you're looking for reliable alternatives, consider using [Cloud Service](https://www.meilisearch.com/pricing?utm_campaign=oss&utm_source=integration&utm_medium=mini-dashboard). It offers a robust solution for those seeking an alternative to this repository by providing a crawler for your convenience.*

*Seeking immediate support? Please join us on [our Discord channel](https://discord.meilisearch.com).*

---

<h4 align="center">
  <a href="https://github.com/meilisearch/meilisearch">Meilisearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://discord.gg/meilisearch">Discord</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier"></a>
  <a href="https://github.com/meilisearch/mini-dashboard/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
  <a href="https://ms-bors.herokuapp.com/repositories/55"><img src="https://bors.tech/images/badge_small.svg" alt="Bors enabled"></a>
</p>
<br/>

<p align="center" style="font-weight:bold;">Meilisearch's mini-dashboard. A web-app served by the engine with a minimal search experience on your data.</p>

<br/>
<p align="center">
  <img src="assets/trumen_quick_loop.gif" alt="Web interface gif" />
</p>
<br/>

**Table of Contents**:

- [Setup](#setup)
- [Run](#run)
- [Build](#build)
  - [Generate build](#generate-build)
  - [Specify Meilisearch's server URL](#specify-meilisearchs-server-url)
  - [Run your build](#run-your-build)
- [Storybook](#storybook)
- [Contributing](#contributing)

<br/>

## Setup

```bash
yarn
```

## Run

```bash
yarn start
```

Go to `http://localhost:3000/` and enjoy ! 🎉

## Build

### Generate build

You can generate a build of this project with the following command:

```bash
yarn build
```

### Specify Meilisearch's server URL

⚠️ By default, the application will call Meilisearch at the exact same address as it is running.
Example: if your app is running at `http://localhost:5000`, it will try to call `http://localhost:5000/indexes` to retrieve the list of your indexes.

If you want to specify the URL where your Meilisearch is running, use the `REACT_APP_MEILI_SERVER_ADDRESS` environment variable.

Example:

```bash
REACT_APP_MEILI_SERVER_ADDRESS=http://0.0.0.0:7700 yarn build
```

### Run your build

The above commands will generate an optimized version of the app, inside the `build` folder.

You can then serve it with any web server of your choice.

Example:

```bash
serve build
```

## Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively test components.

![Storybook](assets/storybook.png)

```bash
yarn storybook
```

## Contributing

If you want to contribute to this project, please make sure to read [the contributing guidelines](./CONTRIBUTING.md)

## Compatibility with Meilisearch

This package guarantees compatibility with [version v1.x of Meilisearch](https://github.com/meilisearch/meilisearch/releases/latest), but some features may not be present. Please check the [issues](https://github.com/meilisearch/mini-dashboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+label%3Aenhancement) for more info.
