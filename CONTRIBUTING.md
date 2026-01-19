# Contributing <!-- omit in toc -->

---

First of all, thank you for contributing to Meilisearch! The goal of this document is to provide everything you need to know in order to contribute to Meilisearch and its different integrations.

- [Coding with AI](#coding-with-ai)
- [Assumptions](#assumptions)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Git Guidelines](#git-guidelines)
- [Release Process (for internal team only)](#release-process-for-internal-team-only)

## Coding with AI

We welcome contributions that use AI-powered tools! If you use any AI assistant (such as GitHub Copilot, ChatGPT, Claude, Cursor, or similar tools) while working on your contribution, whether for code, tests, documentation, or anything else, please mention it in your PR description.

Here's what we ask:
- **Disclose AI usage**: A simple note like "Used GitHub Copilot for autocompletion" or "Generated initial test structure with ChatGPT" is enough.
- **Describe the scope**: Let us know what parts of your contribution involved AI assistance.
- **Review AI-generated content**: Make sure you understand and have reviewed any AI-generated code before submitting.

**AI usage is completely allowed as long as it is disclosed.** We believe in transparency and want to understand how our community works. This also helps maintainers during code review.

## Assumptions


1. **You're familiar with [GitHub](https://github.com) and the [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests)(PR) workflow.**
2. **You've read the Meilisearch [documentation](https://docs.meilisearch.com) and the [README](/README.md).**
3. **You know about the [Meilisearch community](https://docs.meilisearch.com/learn/what_is_meilisearch/contact.html). Please use this for help.**

## How to Contribute

1. Make sure that the contribution you want to make is explained or detailed in a GitHub issue! Find an [existing issue](https://github.com/meilisearch/mini-dashboard/issues) or [open a new one](https://github.com/meilisearch/mini-dashboard/issues/new).
2. Once done, [fork the mini-dashboard repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) in your own GitHub account. Ask a maintainer if you want your issue to be checked before making a PR.
3. [Create a new Git branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).
4. Review the [Development Workflow](#workflow) section that describes the steps to maintain the repository.
5. Make the changes on your branch. If you use AI tools during your work, remember to disclose it in your PR description (see [Coding with AI](#coding-with-ai)).
6. [Submit the branch as a PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) pointing to the `main` branch of the main mini-dashboard repository. A maintainer should comment and/or review your Pull Request within a few days. Although depending on the circumstances, it may take longer.<br>
   We do not enforce a naming convention for the PRs, but **please use something descriptive of your changes**, having in mind that the title of your PR will be automatically added to the next [release changelog](https://github.com/meilisearch/mini-dashboard/releases/).

## Development Workflow

### Setup <!-- omit in toc -->

```bash
yarn
```

### Tests and Linter <!-- omit in toc -->

Each PR should pass the linter to be accepted.

```bash
yarn lint
```

### Storybook <!-- omit in toc -->

This project's components are in Storybook. If you edit one of the components, please make sure that storybook is still up-to-date.

```bash
yarn storybook
```

## Git Guidelines

### Git Branches <!-- omit in toc -->

All changes must be made in a branch and submitted as PR.
We do not enforce any branch naming style, but please use something descriptive of your changes.

### Git Commits <!-- omit in toc -->

As minimal requirements, your commit message should:

- be capitalized
- not finish by a dot or any other punctuation character (!,?)
- start with a verb so that we can read your commit message this way: "This commit will ...", where "..." is the commit message.
  e.g.: "Fix the home page button" or "Add more tests for create_index method"

We don't follow any other convention, but if you want to use one, we recommend [this one](https://chris.beams.io/posts/git-commit/).

### GitHub Pull Requests <!-- omit in toc -->

Some notes on GitHub PRs:

- [Convert your PR as a draft](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request) if your changes are a work in progress: no one will review it until you pass your PR as ready for review.<br>
  The draft PR can be very useful if you want to show that you are working on something and make your work visible.
- All PRs must be reviewed and approved by at least one maintainer.
- The PR title should be accurate and descriptive of the changes. The title of the PR will be indeed automatically added to the next [release changelogs](https://github.com/meilisearch/mini-dashboard/releases/).

## Release Process (for internal team only)

Meilisearch tools follow the [Semantic Versioning Convention](https://semver.org/).

### Automated Changelogs

This project integrates a tool to create automated changelogs.<br>
_[Read more about this](https://github.com/meilisearch/integration-guides/blob/main/guides/release-drafter.md)._

### How to Publish the Release

⚠️ Before doing anything, make sure you got through the guide about [Releasing an Integration](https://github.com/meilisearch/integration-guides/blob/main/guides/integration-release.md).

Make a PR modifying the following files with the right version:

[`package.json`](/package.json):

```javascript
"version": "X.X.X",
```

[`src/version/version.js`](src/version/version.js)

```javascript
export default 'X.X.X'
```

Once the changes are merged on `main`, you can publish the current draft release via the [GitHub interface](https://github.com/meilisearch/mini-dashboard/releases).

GitHub Actions will be triggered and generate a build used by the [Meilisearch engine](https://github.com/meilisearch/meilisearch)

### Add to [Meilisearch Engine](https://github.com/meilisearch/meilisearch/)

The `mini-dashboard` is part of the Meilisearch engine's binary. In order for the engine to be built with the mini-dashboard, these are the steps to follow:

- [Publish the mini-dashboard](#how-to-publish-the-release).
- Ask to the [engine-team](https://github.com/meilisearch/engine-team) on which branch the mini-dashboard should be updated.
- Create a new branch pointing to that branch.
- Update the `/meilisearch/Cargo.toml` file with the link to the latest build.zip of the mini-dashboard ([see example](https://github.com/meilisearch/meilisearch/pull/3322/files)). The link can be found in the `assets` section of the latest release of the mini-dashboard ([see example](https://github.com/meilisearch/mini-dashboard/releases/tag/v0.2.5)). Copy the link of the `build.zip` by right-clicking and selecting `copy link address`.
- Update the sha of the `build.zip` in `/meilisearch/Cargo.toml`. To get the shasum of the file, download the build.zip and find its [shasum](https://en.wikipedia.org/wiki/Sha1sum).
- Make a PR on [`meilisearch`](https://github.com/meilisearch/meilisearch/), with the changes pointing to the required branch (see step 2).

During a `pre-release` of [`meilisearch`](https://github.com/meilisearch/meilisearch/), an additional step is required before publishing the mini-dashboard:
- If there are breaking changes on the search, update the version of `meilisearch-js` and `instant-meilisearch` to their latest compatible version with the pre-release. It may be a [beta](https://github.com/meilisearch/mini-dashboard/pull/322/files) or the latest release. Check with the [integration-team](https://github.com/meilisearch/integrations-guides/) to know if it is required or not.

<hr>

Thank you again for reading this through, we can not wait to begin to work with you if you made your way through this contributing guide ❤️
