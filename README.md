[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-generate-docs/build?label=build&logo=mocha)](https://github.com/kaskadi/action-generate-docs/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-generate-docs?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-generate-docs?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
<!-- ******** Can uncomment this when your coverage is in place ******** -->
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-generate-docs?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-generate-docs?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-generate-docs/?mode=list)

****

# Testing

`mocha`, `chai` & `standard` are available as dev dependencies.

****

# What is this action for?

:point_right: **Describe here what the action should do** :point_left:

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

:point_down: **Placeholder for your inputs and environment description** :point_down:

**Inputs:**
|   Input   | Required |  Default  | Description   |
|:---------:|:--------:|:---------:|---------------|
| `input-1` |    No    | `default` | Description 1 |
| `input-2` |    Yes   | `default` | Description 2 |
| `input-3` |    No    | `default` | Description 3 |

**Outputs:**
|   Output   | Description   |
|:----------:|---------------|
| `output-1` | Description 1 |
|  `ouput-2` | Description 2 |
| `output-3` | Description 3 |

**Environment variables:**
| Variable | Required | Description   |
|:--------:|:--------:|---------------|
|  `env-1` |    No    | Description 1 |
|  `env-2` |    Yes   | Description 2 |
|  `env-3` |    No    | Description 3 |

:point_down: **Here goes any extra details on how to use the action** :point_down:
