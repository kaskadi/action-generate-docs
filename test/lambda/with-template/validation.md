![](https://img.shields.io/github/package-json/v/kaskadi/template-kaskadi-lambda)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/template-kaskadi-lambda?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-lambda/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/template-kaskadi-lambda/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-lambda/build?label=build&logo=mocha)](https://github.com/kaskadi/template-kaskadi-lambda/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-lambda/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/template-kaskadi-lambda/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/template-kaskadi-lambda?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-lambda)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/template-kaskadi-lambda?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-lambda)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/template-kaskadi-lambda?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-lambda)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/template-kaskadi-lambda?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/template-kaskadi-lambda/?mode=list&logo=LGTM)

:point_right: **Badges here** :point_left:

****

# Testing

`mocha`, `chai`, `nyc` & `standard` are available as dev dependencies.

A `build` workflow (see [here](./.github/workflows/build.yml)) is running on `pull request` and will execute your test suite before allowing you to merge your PR. It also has a `coverage` job already prepared that you can comment out as soon as your testing is in place and your `REPORTER_ID` is in the repository secrets. This is the ID on _Code Climate_ used for uploading code coverage reports.

Along `build`, a `syntax-check` workflow will also run to check your `serverless.yml` file syntax.

****

# Deploying

Deploying to AWS is done automatically via a `deploy` workflow (see [here](./.github/workflows/deploy.yml)). This workflow will run on `push` to `master`. Before publishing, it checks for syntax error in your `serverless.yml` file.

**You'll have to switch the command from `--version` to `deploy -v` in the [workflow configuration file](./.github/workflows/deploy.yml) to actually deploy!**

**Warning: you may need to manually deploy the first time via `Serverless` CLI locally.**

****

# What is this lambda for?

This is a template

# Details

|           Name          | Sources                | Timeout |                 Handler                 |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) |

See [lambda configuration file](./serverless.yml) for more details.