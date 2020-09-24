[![Deploy status](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-layer/deploy?label=deploy&logo=Amazon%20AWS)](https://github.com/kaskadi/template-kaskadi-layer/actions?query=workflow%3Adeploy)
[![Build status](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-layer/build?label=build&logo=serverless)](https://github.com/kaskadi/template-kaskadi-layer/actions?query=workflow%3Abuild)

****

# Testing

A `build` workflow (see [here](./.github/workflows/build.yml)) is running on `pull request`. It simply checks the syntax of `serverless.yml` for any errors.

****

# Deploying

Deploying to AWS is done automatically via a `deploy` workflow (see [here](./.github/workflows/deploy.yml)). This workflow will run on `push` to `master`. Before publishing, it checks for syntax error in your `serverless.yml` file.

**You'll have to switch the command from `--version` to `deploy -v` in the [workflow configuration file](./.github/workflows/deploy.yml) to actually deploy!**

**Warning: you may need to manually deploy the first time via `Serverless` CLI locally.**

****

# Resources documentation

The following layers are defined in this repository:
- [template-kaskadi-layer](#template-kaskadi-layer)

## template-kaskadi-layer <a name="template-kaskadi-layer"></a>

### Description

This is a template layer

### Installed NPM dependencies

- `chai`, version: `^4.2.0` ([see on NPM](https://www.npmjs.com/package/chai))
- `mocha`, version: `^8.1.3` ([see on NPM](https://www.npmjs.com/package/mocha))
- `standard`, version: `^14.3.4` ([see on NPM](https://www.npmjs.com/package/standard))

See [configuration file](./serverless.yml) for more details.

# How to install modules?

1. Go into `layer/nodejs`
2. Run `npm i -S <package>` to install any package you need for this layer
