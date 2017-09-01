import packageJson from '../../../package.json';
import validateProjectName from 'validate-npm-package-name';
import semver from 'semver';
import commander from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import { Spinner } from 'cli-spinner';
import { ncp } from 'ncp';

let directoryName;

// Files to be ignored when syncing the project directory
const ignoreFiles = [
    '.git',
    'template',
    'AUTHORS',
    'README.md',
    'CHANGELOG.md',
    'node_modules',
    'lib',
    'dist',
    'src/js/bin',
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
    console.log('Please specify a directory for your new project');
    process.exit(1);
}

console.log('👋🏻  Hi! You ready to create a new project?');
console.log('');
console.log("Just answer a couple of questions and you'll be ready to go");
console.log('');
console.log('');

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
        return promptForPackageJson('keywords', 'keywords');
    })
    .then(() => {
        rl.close();
        createProject(directoryName, packageConfig);
    });

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

    fs.ensureDirSync(name);

    if (!isSafeToCreateProjectIn(targetDir, name)) {
        process.exit(1);
    }

    console.log();
    console.log('👍🏻  Roger that.');
    console.log();

    const spinner = new Spinner('%s Please wait while we`re bootstrapping your project');
    spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
    spinner.start();

    fs
        .copy(`${sourceDir}`, targetDir, {
            filter: (src, dest) => {
                const relativePath = path.relative(sourceDir, src);
                return !shouldBeIgnored(relativePath);
            },
        })
        .then(() => timeout())
        .then(() => {
            return fs.copy(path.resolve(__dirname, 'template'), targetDir);
        })
        .then(() => {
            console.log();
            console.log();
            console.log(`🙌🏻  Your project is ready and is waiting for you over here: ${targetDir}`);
            console.log();
            spinner.stop();
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
    console.log();

    const conflicts = fs.readdirSync(dir).filter(file => !validFiles.includes(file));
    if (conflicts.length < 1) {
        return true;
    }

    console.log(`The directory ${chalk.green(name)} contains files that could conflict:`);
    console.log();
    for (const file of conflicts) {
        console.log(`  ${file}`);
    }
    console.log();
    console.log('Either try using a new directory name, or remove the files listed above.');

    return false;
};
