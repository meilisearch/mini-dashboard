<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/logo.svg" alt="MeiliSearch logo" width="200" height="200" />
</p>

<h1 align="center">Mini Dashboard</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/MeiliSearch">MeiliSearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://slack.meilisearch.com">Slack</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier"></a>
  <a href="https://github.com/meilisearch/mini-dashboard/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
  <a href="https://app.bors.tech/repositories/32634"><img src="https://bors.tech/images/badge_small.svg" alt="Bors enabled"></a>
</p>
<br/>

<p align="center" style="font-weight:bold;" >MeiliSearch's mini-dashboard</p>
<p align="center">PRs and bug issues are welcome, but please do not submit any new feature requests 🙏</p>

<br/>
<p align="center">
  <img src="assets/trumen_quick_loop.gif" alt="Web interface gif" />
</p>
<br/>

📋 **Table of Contents**:

- [Setup](#setup)
- [Run](#run)
- [Build](#build)
  - [Generate build](#generate-build)
  - [Specify MeiliSearch's server URL](#specify-meilisearch-s-server-url)
  - [Run your build](#run-your-build)
- [Storybook](#storybook)
- [Contributing](#contributing)

<br/>

## ⚙️ Setup

```bash
yarn
```

or

```bash
npm install
```

## 🏃‍♂️ Run

```bash
yarn start
```

or

```bash
npm run start
```

Go to `http://localhost:3000/` and enjoy ! 🎉

## 🏗️ Build

### Generate build

You can generate a build of this project with the following command:

```bash
yarn build
```

or

```bash
npm run build
```

### 🐱‍💻 Specify MeiliSearch's server URL

⚠️ By default, the application will call MeiliSearch at the exact same address as it is running.
Example: if your app is running at `http://localhost:5000`, it will try to call `http://localhost:5000/indexes` to retrieve the list of your indexes.

If you want to specify the URL where your MeiliSearch is running, use the `REACT_APP_MEILI_SERVER_ADDRESS` environment variable.

Example:

```bash
REACT_APP_MEILI_SERVER_ADDRESS=http://127.0.0.1:7700 yarn build
```

or

```bash
REACT_APP_MEILI_SERVER_ADDRESS=http://127.0.0.1:7700 npm run build
```

### 🏃🏻‍♀️ Run your build

The above commands will generate an optimized version of the app, inside the `build` folder.

You can then serve it with any web server of your choice.

Example:

```bash
serve build
```

## 📚 Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively test components.

![Storybook](assets/storybook.png)

```bash
yarn storybook
```

or

```bash
npm run storybook
```

## ❤️ Contributing

If you want to contribute to this project, please make sure to read [the contributing guidelines](./CONTRIBUTING.md)
