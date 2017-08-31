import packageJson from '../../../package.json';
import commander from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
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
            resolve(answer);
        });
    });

// prompt('What is your name?').then((name) => {console.log(`Oh, hi ${name}`)});
promptForPackageJson('name', 'package name:')
    .then(() => {
        return promptForPackageJson('version', 'version:');
    })
    .then(() => {
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

const isSafeToCreateProject = dir => {};

const createProject = (name, config) => {
    console.log();
    console.log("👍🏻  Roger that. Please lean back while we'll boostrap your project. That may take a while.");
    console.log();

    const root = path.resolve(name);
    const appName = path.basename(root);

    mkdirp.sync(name);

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
            console.log(`🙌🏻  Your project is ready and is waiting for you over here: ${root}`);
            console.log();
            console.log(`Happy coding.`);
        });
    });
};
