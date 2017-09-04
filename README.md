<p align="center">
  <img alt="Node Blueprint" src=".github/logo.svg" width="888">
</p>

<p align="center">
  <a href="https://travis-ci.org/researchgate/node-package-blueprint"><img alt="Build Status" src="https://travis-ci.org/researchgate/node-package-blueprint.svg?branch=master"></a>
  <a href="https://codecov.io/gh/researchgate/node-package-blueprint"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/researchgate/node-package-blueprint.svg"></a>
  <a href="https://dependencyci.com/github/researchgate/node-package-blueprint"><img alt="Dependency Status" src="https://dependencyci.com/github/researchgate/node-package-blueprint/badge"></a>
  <a href="https://www.npmjs.com/package/@researchgate/node-package-blueprint"><img alt="NPM version" src="https://img.shields.io/npm/v/@researchgate/node-package-blueprint.svg"></a>
</p>

Simplify and standardize the creation and open sourcing of frontend projects. 

- **👩‍💻&nbsp;&nbsp;Start From CLI:** create a new project with one single command
- **📐&nbsp;&nbsp;Project Layout**: follow a clear and pre-defined project structure to make open sourcing easy
- **🔧&nbsp;&nbsp;Integrated Tooling**: conscious choice of tools, configured and accessible via npm/yarn scripts
- **🎡&nbsp;&nbsp;Automated tasks**: from commit message checking to changelog generation for releases

We know that the process of open sourcing projects can sometimes be confusing. And figuring out how to start and knowing what to include can be daunting. 

That's why we decided to standardize the process of open sourcing at ResearchGate so that your experience with open sourcing is easy and enjoyable. 

With this project, we aim to answer your open questions and facilitate this process by providing clear guidelines on how to structure and document your projects, and which tools you should use. 

## Getting started

Install Node Package Blueprint as a global npm package:

```
npm install -g @researchgate/node-package-blueprint
```

Now create a new project with the CLI tool:

```
node-package-blueprint my-project
cd my-project/
```

🏁&nbsp;&nbsp;Your project is ready! Take a look at the folder contents and when ready, install the dependencies:

```
yarn install
```

Once you're ready to release a new version use:

```
yarn release
```

This script will calculate the version number based on your commit history – always make sure you follow the [conventional commits](conventionalcommits.org) guidelines we've outlined. The [CHANGELOG.md](./CHANGELOG.md) file is automatically updated with the relevant changes.

If it's your first release, it's probably not a good idea to bump a new version into the history. For these cases, use the `--first-release` flag:

```
yarn release -- --first-release
```

## Documentation

Our documentation is structured in sections directly available under the `docs` folder:

- [How to Publish](./docs/docs/publishing.md)
- [Project Structure](./docs/docs/project-structure.md)
- [Integrated Tooling](./docs/docs/integrated-tooling.md)
- [Documenting on Github](./docs/docs/documenting-on-github.md)

## Contributing

We'd love your help on creating Node Package Blueprint!

Before you do, please read our [Code of Conduct](.github/CODE_OF_CONDUCT.md) so you know what we expect when you contribute to our projects.

Our [Contributing Guide](.github/CONTRIBUTING.md) tells you about our development process and what we're looking for, gives you instructions on how to issue bugs and suggest features, and explains how you can build and test your changes.

**Haven't contributed to an open source project before?** No problem! [Contributing Guide](.github/CONTRIBUTING.md) has you covered as well.
