### Build scripts

The project's build pipeline and other processes are executed using npm scripts. We avoid using `gulp` or `grunt` intentionally – npm/yarn CLIs can run scripts with sufficient flexibility.

#### Scripts included with this project

| Script  | Description|
| ------------- | ------------- |
| `build` | Runs a full build of all source files, binaries and complied bundles.  |
| `clean` | Removes temporary files such as build folders and generated files.  |
| `coverage` | Generates a test coverage report on source files. |
| `format` | Applies formatting rules to source files.  |
| `generate` | Generates all necessary for a project to be built.  |
| `lint` | Runs code linters for scss, js and json files.  |
| `commitmsg` | Runs the commit message validator  |
| `precommit` | Runs tests and linting before committing |
| `prepare` | Prepares a release of the package by running `clean`, `generate` and `build`  |
| `prepublishOnly` | Runs all tests before publishing  |
| `release` | Releases a new version  |
| `test` | Runs all tests on source files.  |
| `watch` | Watch changes of source files and kicks of new builds.  |

#### Updating scripts

The scripts have been cherry-picked to cover a wide scope of tasks and facilitate and enforce common practices.

The naming of npm scripts follows their purpose and subcommands are namespaced using `:`. For example, the `lint` command is expected to run all linting subcommands under the scope `lint`: (`lint:*`).

This project uses [npm-run-all](https://github.com/mysticatea/npm-run-all) commands to simplify the sequential or parallel exection of scripts.

#### Custom scripts

Sometimes the logic behind your scripts is too complex to be executed on the command line. In this case you can work around using node to execute some javascript rather then using a CLI command.

Put your custom node scripts into a folder called `node` in the root and add subdirectories analog to the namespaced used for the npm script to be called. `generate:assets` should resolve in `node scripts/generate/assets.js`.