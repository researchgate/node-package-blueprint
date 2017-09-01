# Contributing Guide

Thanks for taking the time to contribute!

#### Table of contents

[Code of Conduct](#code-of-conduct)

[Contribution prerequisites](#contribution-prerequisites)

[Project Setup](#project-setup)
  * [How to run the project](#how-to-run)
  * [How to run tests](#how-to-test)

[How can you contribute](#how-can-you-contribute)
  * [Reporting bugs](#reporting-bugs)
  * [Suggesting enhancements](#suggesting-enhancements)
  * [Writing documentation](#writing-documentation)
  * [Your first code contribution](#your-first-code-contribution)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Templates](#issue-and-pull-request-templates)
  * [Need help?](#need-help?)

## Code of Conduct

This project and everyone contributing to it adheres to the [ResearchGate Code of Conduct](CODE_OF_CONDUCT.md).
By participating you are expected to uphold this code. Please report any behavior you find unacceptable to [researchgate@github.com](mailto:researchgate@github.com).

## Contribution prerequisites

Before you start your work, make sure that you:

* have `node` installed at @TODO
* have `npm` installed at @TODO
* are familiar with `git`
* are familiar with [conventional commits](conventionalcommits.org)
* have read and agree to abide by the [ResearchGate Code of Conduct](CODE_OF_CONDUCT.md)

## Project setup

### How to run the project @TODO

Install Node Package Blueprint as a global npm package:

```
npm install -g @researchgate/node-package-blueprint
```

Now create a new project with the CLI tool:

```
node-package-blueprint my-project
cd my-project/
```

Install the dependencies with:

```
yarn install
```

When all dependencies get installed successfully there is a variety of commands at your disposal:

* `yarn build` - runs a full build of all source files, binaries and complied bundles
* `yarn watch` - runs a watcher that makes sure all changes and builds are noticed

For the full list, please refer to [Integrated Tooling](./docs/docs/integrated-tooling.md)

Once you're ready to release a new version use:

* `yarn release` - this will calculate the version number based on your commit history – make sure to follow the [conventional commits](conventionalcommits.org) guidelines. The [CHANGELOG.md](./CHANGELOG.md) file is automatically updated with the relevant changes.

If it's your first release, you probably do not want to bump a new version into the history.
If that is the case, please use the `--first-release` flag:

```
yarn release -- --first-release
```

### How to run tests

This project uses [jest](http://facebook.github.io/jest/) for JavaScript testing.

To run tests, execute:

```
yarn test
```

Since coverage is not collected by default when running yarn test, run:

```
yarn coverage
```

To run linters use:

```
yarn lint
```

## How you can contribute

### Reporting bugs

This section guides you through the steps to follow when you submit a bug report for a ResearchGate project.

Following these guidelines makes it easy for the maintainers and community to understand your report, reproduce the behavior, and find related reports.

Before creating a bug report, please check Open Issues as you may find that there is already an issue open for the bug you’ve found. When you create a bug report, be sure to include as much detail as possible and fill out [the required template](ISSUE_TEMPLATE.md), the information it asks for helps us resolve issues faster.

After you have submitted the issue, we'll try to get back to you as soon as possible.

### Suggesting enhancements

This section guides you through submitting a feature suggestion.

All enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/) and, when approved by a core team member or project maintainer, are given the green light to then be turned into a Pull Request.
For the best possible experience, please provide us with:

* **A clear and descriptive title**
* **A step-by-step description of the suggested enhancement** and what it should do
* **Specific examples to demonstrate the steps**. Ideally, you should support it with code snippets, screenshots, and/or animated GIFs
* **Explanation of why this feature would be useful** to this project
* **Your development environment** and context for creating the feature

After you have submitted your Pull Request, we'll try to get back to you as soon as possible.

### Writing documentation

All great projects require good documentation.
There is __always__ room for (better) docs, so why not to contribute to the project by enhancing them?
Please do so via Pull Request.

### Your first code contribution

Unsure where you can start contributing?
We strive to make all our projects easy for beginners to contribute to. Just look out for issues labeled `help-wanted` and `beginner-friendly`, then get stuck in!
If you still need some guidance, consider [this resource](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) and/or contact us.

## Additional notes

### Issue and pull request templates

When filing an issue or pull request, please take the time to fill out the templates we provide in as much detail as you can. This helps ensure that we have all the information we need to provide you with the right support so that your experience contributing to our open-source project runs as smoothly and easily as you would like it to.

### Need help?

If you need any help or require additional information, don't hesitate to contact the project maintainer or any of the contributors listed in the [ResearchGate Open Source Support team](SUPPORT.md)

Thank you for contributing!
