<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/logo.svg" alt="Meilisearch logo" width="200" height="200" />
</p>

<h1 align="center">Mini Dashboard</h1>

---

🚨 IMPORTANT NOTICE: Reduced Maintenance & Support 🚨

*Dear Community,*

*We'd like to share some updates regarding the future maintenance of this repository:*

*Our team is small, and our availability will be reduced in the upcoming times. As such, response times might be slower, and we will not be accepting enhancements for this repository moving forward.*

*If you're looking for reliable alternatives, consider using [Meilisearch Cloud](https://meilisearch.com/cloud?utm_campaign=oss&utm_source=github&utm_medium=minidashboard). For instance, it offers a convenient solution for managing your index settings.*

*Seeking immediate support? Please join us on [our Discord server](https://discord.meilisearch.com).*

---

<h4 align="center">
  <a href="https://www.meilisearch.com/?utm_campaign=oss&utm_source=github&utm_medium=minidashboard">Website</a> |
  <a href="https://www.meilisearch.com/cloud?utm_campaign=oss&utm_source=github&utm_medium=minidashboard">Meilisearch Cloud</a> |
  <a href="https://blog.meilisearch.com/?utm_campaign=oss&utm_source=github&utm_medium=minidashboard">Blog</a> |
  <a href="https://meilisearch.com/docs?utm_campaign=oss&utm_source=github&utm_medium=minidashboard">Documentation</a> |
  <a href="https://discord.meilisearch.com/?utm_campaign=oss&utm_source=github&utm_medium=minidashboard">Discord</a>
</h4>

> Meilisearch is an open-source search engine that offers fast, relevant search out of the box.

👉 [Meilisearch repository](https://github.com/meilisearch/meilisearch)

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

## Docker

You can also run the mini-dashboard with Docker.

```bash
docker build -t meilisearch-mini-dashboard .
docker run -it -e REACT_APP_MEILI_SERVER_ADDRESS=http://localhost:7700 -p 3000:3000 meilisearch-mini-dashboard
```

You can then access the mini-dashboard at `http://localhost:3000`.

## Docker with Nginx
nginx is also available in the Docker image. You can use it to serve the mini-dashboard.

```bash
docker build --build-arg REACT_APP_MEILI_SERVER_ADDRESS=http://meilisearch:7700 -t meilisearch-mini-dashboard-nginx . -f Dockerfile.nginx
docker run -p 8080:80 meilisearch-mini-dashboard-nginx
```

You can then access the mini-dashboard at `http://localhost:8080`.


## Contributing

If you want to contribute to this project, please make sure to read [the contributing guidelines](./CONTRIBUTING.md)

## Compatibility with Meilisearch

This package guarantees compatibility with [version v1.x of Meilisearch](https://github.com/meilisearch/meilisearch/releases/latest), but some features may not be present. Please check the [issues](https://github.com/meilisearch/mini-dashboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+label%3Aenhancement) for more info.
