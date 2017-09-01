# node-package-blueprint

[![Greenkeeper badge](https://badges.greenkeeper.io/researchgate/node-package-blueprint.svg)](https://greenkeeper.io/)
Blueprint for scaffolding new node packages

[![Build Status](https://travis-ci.org/researchgate/node-package-blueprint.svg?branch=master)](https://travis-ci.org/researchgate/node-package-blueprint)
[![Codecov](https://img.shields.io/codecov/c/github/researchgate/node-package-blueprint.svg)](https://codecov.io/gh/researchgate/node-package-blueprint)
[![Dependency Status](https://dependencyci.com/github/researchgate/node-package-blueprint/badge)](https://dependencyci.com/github/researchgate/node-package-blueprint)

# Guidelines

### Build scripts

The project's build pipeline and other processes are executed using npm scripts. Avoid using `gulp` or `grunt` if possible – npm scripts are as powerful as these tools are.

#### Scripts shipped with this project

| Script  | Description|
| ------------- | ------------- |
| `build` | Runs a full build of all source files, binaries and complied bundles.  |
| `lint` | Runs code linters for scss, js and json files.  |
| `format` | Applies formatting rules to source files.  |
| `generate` | Generates all necessary for a project to be built.  |
| `clean` | Removes temporary files such as build folders and generated files.  |
| `test` | Runs all tests on source files.  |
| `prepare` | Prepares a release of the package by running `clean`, `generate` and `build`  |
| `watch` | Watch changes of source files and kicks of new builds.  |
| `prepublishOnly` | Runs all tests before publishing  |
| `precommit` | Runs tests and linting before committing |


#### Write your own scripts

Feel free to extend the scripts to meet your requirements.

The naming of npm scripts follows their purpose and subcommands are namespaced using `:`. While a `lint` is expected to run all linting related subcommands ()`lint:*`), `lint:js` is expected to just run linting for javascript files.

Use [npm-run-all](https://github.com/mysticatea/npm-run-all) commands to simplify the sequential or parallel exection of scripts.

#### What if my scripts are too complex?

Sometimes the logic behind your scripts is too complex to be executed on the command line.

In this case you can work around using node to execute some javascript rather then using a cli command.

Put your custom node scripts into a folder called `node` in the root and add subdirectories analog to the namespaced used for the npm script to be called. `generate:assets` should resolve in `node scripts/generate/assets.js`.

# Contribute

## Install
Use `yarn` to install dependencies
```yarn install```

## Release
In order to release a new version of the project.

```yarn release```

A new version will be calculated based on your commit history – make sure to follow [conventional commit message guidelines](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).
Additionally the CHANGELOG.md will be updated automatically.

If you do your first release and don't want your version to be bumped you can use the `--first-release` flag.

```yarn release -- --first-release```

## Publish

After creating a release you probably want to publish your updates to npm. In order to do that run

```git push --follow-tags origin master; npm publish```

Note: If you publish for the first time make sure to include `access` flag to the command:

```git push --follow-tags origin master; npm publish --access public```
