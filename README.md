[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-generate-docs/build?label=build&logo=mocha)](https://github.com/kaskadi/action-generate-docs/actions?query=workflow%3Abuild)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-generate-docs/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-generate-docs/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-generate-docs?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-generate-docs?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/action-generate-docs?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-generate-docs)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-generate-docs?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-generate-docs/?mode=list)

****

# What is this action for?

This action allows you to automatically generate Markdown documentation for your repository

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```yaml
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-generate-docs@master
      with:
        type: {TYPE-VALUE}
        template: {TEMPLATE-VALUE}
      env:
        sls-1: {SLS-1-VALUE}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Inputs:**
|    Input   | Required | Default | Description                                                                                        |
| :--------: | :------: | :-----: | :------------------------------------------------------------------------------------------------- |
|   `type`   |  `true`  |         | type of repository to generate the documentation for. Accepted values: `action`, `package`         |
| `template` |  `false` |         | the template (.md) you would like to use. The documentation will be injected in place of {{>main}} |

**Environment variables:**
| Variable | Required | Description                                                                                                                                                                        |
| :------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `sls-1` |  `false` | an environment variable used inside of your `serverless.yml` configuration files. Feel free to add more! Only relevant when generating `layer`, `lambda` and `api` documentations. |

**In order to sign the commit for your newly generated docs via GPG**: add the following `step` before the actual documentation generation step:
```yaml
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
```

**If you do not need to sign your commit via GPG**: simply replace the `Import GPG key` step of the job by:
```yaml
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```

---
**Action documentation generation:**

The documentation generation for `GitHub Actions` is based off of the action's `action.yml` configuration file. It pulls data from this configuration file to build the documentation.

Beyond using the regular metadata (`description`, `name`, `inputs`, `outputs`), it also uses some extra custom fields:
- `inputs.<input_id>.value`: this child property of the `inputs.<input_id>` field is used for providing the documentation generator data about the value that should be assigned to a given `input` in the action usage example.
- `env`: following the same syntax as `inputs` and `outputs` you can define any environment variables used by this action. `env` child properties are `description`, `required` and `value`

_Note:_ for the `description` fields, you can use regular Markdown in your `action.yml` to create any kind of formatting you would like.

If you wonder how the documentation generated by `action-generate-docs` looks like for an action, simply check the current `README.md`. It has been generated via the action itself!

---
**Package documentation generation:**

The documentation generation for NPM packages is using `JSDOC`. It reads all `.js` file at any level of your repository and if it finds some `JSDOC`-style comments it will output the corresponding documentation.

---
**Element (`lit-element`) documentation generation:**

The documentation generation for custom element developed with `lit-element` is using `JSDOC`. It reads the file specified under the `main` field found in `package.json` and if it finds some `JSDOC`-style comments it will output the corresponding documentation. It also checks for any CSS custom variables and lists them in the documentation.

It also uses `package.json` to extract information about the published component (under `kaskadi.s3-push.files`) in order to document how to use this element inside of another element or inside of the browser directly.

---
**Layer documentation generation:<a name="layer"></a>**

The documentation generation for AWS Lambda layers is using the main `serverless.yml` configuration file. It extracts the meta data for all layers found in this file and generate its documentation based on those data.

**Notes:**
- **Warning:** if you are using environment variables inside of your `serverless.yml` file, you should also add those as an `env` for the step that generates the documentation (see action configuration above)
- supports multi-layer
- supports file referencing and Serverless variables resolution
- won't reflect resolved values for references to CloudFormation resources via intrinsic functions (like `!GetAtt`, etc.)
- supports custom utilities in layer: any folder in `node_modules` inside of a layer which is not an NPM package will also be listed as dependency

---
**Lambda functions documentation generation:<a name="lambda"></a>**

The documentation generation for AWS Lambda functions is using the main `serverless.yml` configuration file. It extracts the meta data for all Lambda functions found in this file and generate its documentation based on those data.

**Notes:**
- **Warning:** if you are using environment variables inside of your `serverless.yml` file, you should also add those as an `env` for the step that generates the documentation (see action configuration above)
- supports multi-lambda
- support layers: if layers are attached to lambdas, it will be reflected in the documentation. Layers defined inside of the current stack will also be documented like with the [`layer` module](#layer)
- supports file referencing and Serverless variables resolution
- won't reflect resolved values for references to CloudFormation resources via intrinsic functions (like `!GetAtt`, etc.). **Exception:** layer referencing via `Fn::Join` and `Ref` intrinsic functions. The action will be able to resolve this kind of reference to your layer for the related lambda function in those cases. Regular ARNs are also valid references for layers.

---
**API documentation generation:**

The documentation generation for AWS API Gateway is using the main `serverless.yml` configuration file. It extracts the meta data for all endpoints found in this file and generate its documentation based on those data.

This module uses a custom field `kaskadi-docs` inside of the `custom` field and every lambda function `events` fields.
- `custom.kaskadi-docs`: allows users to define the API origin and its root path:
```YAML
# this will print the API base URl as https://example.com/logical-unit
custom:
  kaskadi-docs:
    hostname: example.com
    root: logical-unit
```
- `functions.SOME_LAMBDA.events.EVENT_TYPE.kaskadi-docs`: allows users to describe an endpoint as well as provide examples.
```YAML
# inside of a given endpoint
events:
  - http:
      method: post
      path: hello
      cors: true
      kaskadi-docs:
        # from here we describe the endpoint and what query string/request body parameters it should expect (as well as any default values)
        description: placeholder endpoint
        queryStringParameters:
          - key: key1
            description: first key
          - key: key2
            description: second key
            default: 35
        body:
          - key: param1
            description: first body param
            default: 'hello'
          - key: param2
            description: second body param
            default: true
        # this field allows users to define multiple examples of request/response
        examples:
          - request:
              pathParameters: # any path parameters specified in here will be swapped by their respective value in the example request
                id: 123
                some-param: true
                another_param: hey
                proxy+: hello
              headers:
                'Content-Type': 'application/json'
              queryStringParameters:
                key1: hello
                key2: test
              body:
                param1: a param
                param2: another one
            response:
              statusCode: 200
              headers:
                'x-kaskadi-data': some data
              body:
                resParam1: hello
                resParam2: test
          - request:
              pathParameters: # any path parameters specified in here will be swapped by their respective value in the example request
                id: 123
                some-param: true
                another_param: hey
                proxy+: hello
              headers:
                'Content-Type': 'application/json'
              queryStringParameters:
                key1: hello
                key2: test
              body:
                param1: a param
                param2: another one
            response:
              statusCode: 200
              headers:
                'x-kaskadi-data': some data
              body:
                resParam1: hello
                resParam2: test
```

**Notes:**
- **Warning:** if you are using environment variables inside of your `serverless.yml` file, you should also add those as an `env` for the step that generates the documentation (see action configuration above)
- supports lambdas and layers the same way as the [`lambda` module](#lambda) and the [`layer` module](#layer) do
