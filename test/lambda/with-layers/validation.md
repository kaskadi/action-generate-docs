# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)

The following layers are defined in this repository:
- [template-kaskadi-layer](#template-kaskadi-layer)

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                | Timeout |                 Handler                 | Layers                                                                                                                                                                                                                                                                                                          |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>[template-kaskadi-layer](#template-kaskadi-layer)</li><li>[template-kaskadi-layer](#template-kaskadi-layer)</li><li>just-for-testing</li><li>just-for-testing</li><li>test-layer _(defined via ARN: "arn:aws:lambda:eu-central-1:111111111111:layer:test-layer:23")_</li><li>just-for-testing</li></ul> |

See [configuration file](./serverless.yml) for more details.

## template-kaskadi-layer <a name="template-kaskadi-layer"></a>

### Description

No description found for this layer...

### Installed NPM dependencies

- `chai` ([see on NPM](https://www.npmjs.com/package/chai))
- `mocha` ([see on NPM](https://www.npmjs.com/package/mocha))
- `standard` ([see on NPM](https://www.npmjs.com/package/standard))

See [configuration file](./serverless.yml) for more details.