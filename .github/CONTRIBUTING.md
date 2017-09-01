# Contributing Guide

Thanks for taking the time to contribute!

#### Table of contents

[Code of Conduct](#code-of-conduct)

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

## Project setup

### How to run the project

## Release
To release a new version of the project.

```yarn release```

A new version will be calculated based on your commit history – make sure you follow [conventional commit message guidelines](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).
Please be aware that the CHANGELOG.md will be updated automatically.

If, for your first release, you don't want your version to be bumped,use the `--first-release` flag.

```yarn release -- --first-release```

## Publish

After creating a release, you probably want to publish your updates to npm. To do this, run

```git push --follow-tags origin master; npm publish```

Note: When you publish for the first time, make sure you include `access` flag to the command:

```git push --follow-tags origin master; npm publish --access public```

## How you can contribute

### Reporting bugs

This section guides you through the steps to follow when you submit a bug report for a ResearchGate project.
Following these guidelines makes it easy for the maintainers and community to understand your report, reproduce the behavior, and find related reports.

Before creating a bug report, please check Open Issues as you may find that there is already an issue open for the bug you’vefound. When you create a bug report, be sure to include as much detail as possible and fill out [the required template](ISSUE_TEMPLATE.md), the information it asks for helps us resolve issues faster.

### Suggesting enhancements

This section guides you through submitting a feature suggestion.
All enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/) and, when approved by a core team member or project maintainer, are given the green light to then be turned into a Pull Request.
For the best possible experience, please provide us with:

* **A clear and descriptive title**
* **A step-by-step description of the suggested enhancement** and what it should do
* **Specific examples to demonstrate the steps**. Ideally, you should support it with code snippets, screenshots, and/or animated GIFs
* **Explanation of why this feature would be useful** to this project
* **Your development environment** and context for creating the feature

### Writing documentation

All great projects require good documentation.
There is __always__ room for (better) docs, so why not to contribute to the project by enhancing them?

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
