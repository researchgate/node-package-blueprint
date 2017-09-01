## Project Structure

The scaffolding is mapped after Github's guidelines for public repositories.

1. Github pages live under the root `docs` folder.
2. The `.github` folder is used for issues and pull requests docs.
3. The root folder holds the `src` (sources) folder.

```
node-package-blueprint my-project
cd my-app
```

It will create a directory called my-project inside the current folder.
Inside that directory, it will generate the initial project structure:

```
my-project
├── README.md
├── package.json
├── .gitignore
├── .travis.yml
├── [...]
└── src
    └── js
        └── [...]
    └── scss
        └── [...]
└── docs
    ├── README.md
    └── docs
        └── [...]
```

No configuration or complicated folder structures, just the files you need to build your app.
Once the installation is done, you can [run some commands](./integrated-tooling.md) inside the project folder.
