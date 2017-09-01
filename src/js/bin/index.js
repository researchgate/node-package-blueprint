#!/usr/bin/env node

import packageJson from '../../../package.json';
import validateProjectName from 'validate-npm-package-name';
import semver from 'semver';
import commander from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { Spinner } from 'cli-spinner';
import git from 'nodegit';
import { ncp } from 'ncp';

const GIT_URL = 'https://github.com/researchgate/node-package-blueprint.git';

const log = console.log;
let directoryName;

// Files to be ignored when syncing the project directory
const ignoreFiles = [
    'package.json',
    '.git',
    'template',
    'AUTHORS',
    'README.md',
    'CHANGELOG.md',
    'node_modules',
    'lib',
    'dist',
    'src/js/bin',
    'docs',
];

// Default values for package.json
// @todo add default name based on the passed directory
const packageConfig = {
    version: '0.1.0',
    author: '',
};

// Configuration in package.json that should be ignored
const ignorePackageConfig = ['homepage', 'bugs', 'repository'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const program = new commander.Command()
    .version(packageJson.version)
    .arguments('<directory>')
    .usage(`${chalk.green('<directory>')} [options]`)
    .action(function(directory) {
        packageConfig.name = directory.split('/').pop();
        directoryName = directory;
    })
    .parse(process.argv);

if (typeof directoryName === 'undefined') {
    log('Please specify a directory for your new project');
    process.exit(1);
}

// Main run file
const run = () => {
    const targetDir = path.resolve(directoryName);
    fs.ensureDirSync(directoryName);

    if (!isSafeToCreateProjectIn(targetDir, directoryName)) {
        process.exit(1);
    }

    log();
    log('👋🏻  Hi! You ready to create a new project?');
    promptPackageJson();
};

const prompt = question =>
    new Promise((resolve, reject) => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });

const promptForPackageJson = (key, question) =>
    new Promise((resolve, reject) => {
        const defaultConfig = packageConfig[key] ? chalk.grey(` ${packageConfig[key]}`) : '';
        prompt(`${question}${defaultConfig} `).then(answer => {
            packageConfig[key] = answer || packageConfig[key];
            resolve(packageConfig[key]);
        });
    });

const promptPackageJson = () => {
    log();
    log("Just answer a couple of questions and you'll be ready to go");
    log();

    promptForPackageJson('name', 'package name:')
        .then(name => {
            if (!isNameValid(name)) {
                process.exit(1);
            }
            return promptForPackageJson('version', 'version:');
        })
        .then(version => {
            if (!isVersionValid(version)) {
                process.exit(1);
            }
            return promptForPackageJson('description', 'description:');
        })
        .then(() => {
            return promptForPackageJson('author', 'author:');
        })
        .then(() => {
            return promptForPackageJson('keywords', 'keywords:');
        })
        .then(keywords => {
            packageConfig.keywords = keywords ? keywords.split(/[\s,]+/) : '';
            confirmProjectCreation(directoryName, packageConfig);
        })
        .catch(e => {
            console.log(e);
        });
};

const confirmProjectCreation = (directoryName, packageConfig) => {
    log();
    const question = `${JSON.stringify(packageConfig, null, 2)}\n\nIs that okay? ${chalk.grey('yes')}`;

    rl.question(question, answer => {
        if (answer) {
            promptPackageJson();
        } else {
            createProject(directoryName, packageConfig);
            rl.close();
        }
    });
};

const printValidationResults = results => {
    if (typeof results !== 'undefined') {
        results.forEach(error => {
            console.error(chalk.red(`  *  ${error}`));
        });
    }
};

const shouldBeIgnored = src => {
    for (var i = 0; i < ignoreFiles.length; i++) {
        if (src.indexOf(ignoreFiles[i]) === 0) {
            return true;
        }
    }
    return false;
};

const createProject = (name, config) => {
    const targetDir = path.resolve(name);
    const sourceDir = path.resolve(__dirname, '../../../');
    const appName = path.basename(targetDir);

    log();
    log('👍🏻  Roger that.');
    log();

    const spinner = new Spinner('%s Please wait while we`re bootstrapping your project');
    spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
    spinner.start();

    fs
        .emptyDir('./tmp')
        .then(() => {
            log();
            log('🚚  Fetching project files from repository');
            return git.Clone(GIT_URL, './tmp');
        })
        .then(() => {
            log();
            log('📦  Prepare project');
            return fs.copy(`./tmp`, targetDir, {
                filter: (src, dest) => {
                    const relativePath = path.relative(`./tmp`, src);
                    return !shouldBeIgnored(relativePath);
                },
            });
        })
        .then(() => {
            const gitPackageJson = fs.readJsonSync(path.join('./tmp', 'package.json'));
            const newPackageJson = Object.assign({}, gitPackageJson, packageConfig);

            ignorePackageConfig.forEach(ignore => {
                delete newPackageJson[ignore];
            });
            return fs.outputFile(path.join(targetDir, 'package.json'), JSON.stringify(newPackageJson, null, 2));
        })
        .then(() => timeout())
        .then(() => {
            return fs.copy(path.resolve(__dirname, 'template'), targetDir);
        })
        .then(() => {
            log();
            log();
            log(`🙌🏻  Your project is ready and is waiting for you over here: ${targetDir}`);
            log();
            spinner.stop();
        })
        .catch(e => {
            log(e);
        });
};

const timeout = () =>
    new Promise(resolve => {
        setTimeout(resolve, 1000);
    });

const isNameValid = name => {
    const validationResult = validateProjectName(name);
    if (!validationResult.validForNewPackages) {
        console.error(
            `Could not create a project called ${chalk.red(`"${name}"`)} because of npm naming restrictions:`,
        );
        printValidationResults(validationResult.errors);
        printValidationResults(validationResult.warnings);
        return false;
    }
    return true;
};

const isVersionValid = version => {
    const validationResult = semver.valid(version);

    if (!validationResult) {
        console.error(
            `Could not create a project with version ${chalk.red(
                `"${version}"`,
            )} because of invalid semantic version format.`,
        );
        return false;
    }
    return true;
};

const isSafeToCreateProjectIn = (dir, name) => {
    const validFiles = [
        '.DS_Store',
        'Thumbs.db',
        '.git',
        '.gitignore',
        '.idea',
        'README.md',
        'LICENSE',
        'web.iml',
        '.hg',
        '.hgignore',
        '.hgcheck',
    ];
    log();

    const conflicts = fs.readdirSync(dir).filter(file => !validFiles.includes(file));
    if (conflicts.length < 1) {
        return true;
    }

    log(`The directory ${chalk.green(name)} contains files that could conflict:`);
    log();
    for (const file of conflicts) {
        log(`  ${file}`);
    }
    log();
    log('Either try using a new directory name, or remove the files listed above.');

    return false;
};

run();
