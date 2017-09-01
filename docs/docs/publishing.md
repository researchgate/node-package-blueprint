## Publishing to NPM

After creating a release you probably want to publish your updates to npm. In order to do that run

```git push --follow-tags origin master; npm publish```

Note: If you publish for the first time make sure to include `access` flag to the command:

```git push --follow-tags origin master; npm publish --access public```