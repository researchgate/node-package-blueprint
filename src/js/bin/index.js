import packageJson from '../../../package.json';
import validateProjectName from 'validate-npm-package-name';
import semver from 'semver';
import commander from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { Spinner } from 'cli-spinner';
import { ncp } from 'ncp';

let directoryValue;

const packageJsonNew = {
    version: '0.1.0',
    author: '',
};
const packageJsonOverwrites = ['homepage', 'bugs', 'repository'];

const config = {
    version: '0.1.0',
    author: '',
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const program = new commander.Command()
    .version(packageJson.version)
    .arguments('<directory>')
    .usage(`${chalk.green('<directory>')} [options]`)
    .action(function(directory) {
        directoryValue = directory;
    })
    .parse(process.argv);

if (typeof directoryValue === 'undefined') {
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
        const defaultConfig = packageJsonNew[key] ? chalk.grey(` ${packageJsonNew[key]}`) : '';
        prompt(`${question}${defaultConfig} `).then(answer => {
            packageJsonNew[key] = answer || packageJsonNew[key];
            resolve(packageJsonNew[key]);
        });
    });

// prompt('What is your name?').then((name) => {console.log(`Oh, hi ${name}`)});
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
        createProject(directoryValue, config);
    });

const printValidationResults = results => {
    if (typeof results !== 'undefined') {
        results.forEach(error => {
            console.error(chalk.red(`  *  ${error}`));
        });
    }
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

const createProject = (name, config) => {
    const root = path.resolve(name);
    const appName = path.basename(root);

    mkdirp.sync(name);

    if (!isSafeToCreateProjectIn(root, name)) {
        process.exit(1);
    }

    console.log();
    console.log('👍🏻  Roger that.');
    console.log();

    const spinner = new Spinner('%s Please wait while we`re bootstrapping your project');
    spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
    spinner.start();

    ncp(path.resolve(__dirname, '../../../'), root, err => {
        if (err) {
            return console.error(err);
        }

        const newPackageJson = Object.assign({}, packageJson, packageJsonNew);

        packageJsonOverwrites.forEach(packageJsonOverwrite => {
            delete newPackageJson[packageJsonOverwrite];
        });

        fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(newPackageJson, null, 2));

        ncp(path.resolve(__dirname, '../../../template'), root, err => {
            console.log();
            console.log();
            console.log(`🙌🏻  Your project is ready and is waiting for you over here: ${root}`);
            console.log();
            spinner.stop();
        });
    });
};
