[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-generate-docs/build?label=build&logo=mocha)](https://github.com/kaskadi/action-generate-docs/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-generate-docs?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-generate-docs?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
<!-- ******** Can uncomment this when your coverage is in place ******** -->
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-generate-docs?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-generate-docs?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-generate-docs/?mode=list)

****

# What is this action for?

a GitHub action that allows you to automatically generate Markdown documentation

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-generate-docs@master
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|    Input   | Required | Default | Description                                                                                                    |
| :--------: | :------: | :-----: | :------------------------------------------------------------------------------------------------------------- |
|   `type`   |  `true`  |         | type of repository to generate the documentation for                                                           |
| `template` |  `false` |         | the handlebars (.hbs) template you would like to use. The documentation will be injected in place of {{>main}} |


:point_down: **Here goes any extra details on how to use the action** :point_down:
