# Mini-Dashboard

MeiliSearch's next mini-dashboard. It will soon replace the current mini-dashboard available while lauching your MeiliSearch.

<p align="center">
  <img src="assets/trumen_quick_loop.gif" alt="Web interface gif" />
</p>

## Setup

```bash
yarn
```

or

```bash
npm install
```

## Run

```bash
yarn start
```

or

```bash
npm run start
```

Go to `http://localhost:3000/` and enjoy ! 🎉

## Build

You can generate a build of this project with the following command:

```bash
yarn build
```

or

```bash
npm run build
```

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

## Storybook

Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively test components.

![Storybook](assets/storybook.png)

```bash
yarn storybook
```

or

```bash
npm run storybook
```

## Contributing

If you want to contribute to this project, please make sure to read [the contributing guidelines](./CONTRIBUTING.md)
