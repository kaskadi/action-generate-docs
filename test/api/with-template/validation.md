**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/template-kaskadi-api/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/build?label=build&logo=mocha)](https://github.com/kaskadi/template-kaskadi-api/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/template-kaskadi-api/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/template-kaskadi-api?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-api)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/template-kaskadi-api?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-api)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/template-kaskadi-api?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/template-kaskadi-api)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/template-kaskadi-api?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/template-kaskadi-api/?mode=list&logo=LGTM)

:point_right: **Badges here** :point_left:

****

# Testing

`mocha`, `chai`, `nyc`, `serverless-offline` & `standard` are available as dev dependencies.

A `build` workflow (see [here](./.github/workflows/build.yml)) is running on `pull request` and will execute your test suite before allowing you to merge your PR. It also has a `coverage` job already prepared that you can comment out as soon as your testing is in place and your `REPORTER_ID` is in the repository secrets. This is the ID on _Code Climate_ used for uploading code coverage reports.

Along `build`, a `syntax-check` workflow will also run to check your `serverless.yml` file syntax.

****

# Deploying

Deploying to AWS is done automatically via a `deploy` workflow (see [here](./.github/workflows/deploy.yml)). This workflow will run on `push` to `master`. Before publishing, it checks for syntax error in your `serverless.yml` file.

**You'll have to switch the command from `--version` to `deploy -v` in the [workflow configuration file](./.github/workflows/deploy.yml) to actually deploy!**

**Warning: you may need to manually deploy the first time via `Serverless` CLI locally.**

****

# Tools

## Add new endpoints

In order to add new endpoints:
1. Go to the root of your API repository
2. Run `npm run add-lambda <lambda_name> <http_method> <path/to/your/lambda>`
3. Your endpoint is now located under `lambdas/<lambda_name>` and you can start developing!

## Upgrade API version

To update your API version, run `npm run upgrade-version <version_option>`. This takes the same argument as `npm version` (see [here](https://docs.npmjs.com/cli/version)). It will update for you the main `package.json` as well as `serverless.json` but also all `package.json` for all endpoints.

****

# Using custom domain for your API

_For all custom domains you will need a certificate for this domain. Please make sure that you have the proper certificate generated, else create one associated with your domain. All this can be done [here](https://console.aws.amazon.com/acm/home?region=us-east-1#/)_

**Case 1: creating a new custom domain for API**

If the custom domain you wish to use hasn't been created yet (list of custom domains [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names)).

1. Go [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names) and click on _Create Custom Domain Name_
2. Configure your domain as you wish to
3. Once the domain is created and initialized, go to [Route 53](https://console.aws.amazon.com/route53/home?region=eu-central-1)
4. Go into the _Hosted Zone_ for the domain you wish to use and create a new _A Record_.
5. For this record, you should toggle the _Alias_ option, give for _name_ the custom domain name you wish to use and select for _Alias target_ the API you want to map to this domain. You may need to copy paste the base URL to that API to make this work

**Case 2: using an existing custom domain**

1. Go [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names)
2. Click on _Edit_ for the custom domain you wish to use
3. Add a base path you wish to map your API to for this domain and then select the API & its stage in the dropdown menus

**Attention:** you can only use an existing custom domain if this domain doesn't have already an empty path as base path.

****

# API endpoints

The following endpoints are defined in this API:
- [/hello](#/hello)

## `/hello` (target lambda → [hello-world](#hello-world))

Supported methods:
- [GET](#GET)

### `GET`

**Description:**

placeholder endpoint

**Query string parameters:**

|   Key  | Default | Description |
| :----: | :-----: | :---------- |
| `key1` |         | first key   |
| `key2` |   `35`  | second key  |

**Request body:**

|    Key   | Default | Description       |
| :------: | :-----: | :---------------- |
| `param1` | `hello` | first body param  |
| `param2` |  `true` | second body param |

_Example request:_

```HTTP
GET /hello?key1=key1_value&key2=key2_value

{
  "param1": "param1_value",
  "param2": "param2_value"
}
```

# API resources

The following lambda functions are used in this API:
- [hello-world](#hello-world)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)..._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

- app: your-app-name
- service: template-kaskadi-api
- logical-unit: api-logical-unit
- type: s3, sns, etc.