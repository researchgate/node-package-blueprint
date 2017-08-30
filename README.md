# node-package-blueprint
Blueprint for scaffolding new node packages

# Guidelines

### Build scripts

The build and other processes are executed using npm scripts. Their naming follows their purpose and subcommands are namespaced using `:` (e.g. `lint:scss` just lints scss files). Subcommands are expected to all be executed when simply calling the master command. (e.g. `lint` executes `lint:scss`, `lint:js` and `lint:json`).

#### `build`
Runs a full build of all source files, binaries and complied bundles.

#### `lint`
Runs code linters for scss, js and json files.

#### `format`
Applies formatting rules to source files.

#### `generate`
Generates all necessary for a project to be built.

#### `clean`
Removes temporary files such as build folders and generated files.

#### `test`
Runs all tests on source files

#### `prepare`
Prepares a release of the package by running `clean`, `generate` and `build`

#### `watch`
Watch changes of source files and kicks of new builds.


# Contribute

## Install
Use `yarn` to install dependencies
```yarn install```

## Publish
Use `npm` to publish
```npm publish```
