# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)

The following layers are defined in this repository:
_no layer defined in the [configuration file](./serverless.yml)..._

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                | Timeout |                 Handler                 | Destinations                                                          |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :-------------------------------------------------------------------- |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>On failure: my-queue _(type: SQS, defined via ARN)_</li></ul> |

See [configuration file](./serverless.yml) for more details.

# Stack tags

- app: your-app-name
- service: template-kaskadi-lambda
- logical-unit: api-logical-unit
- type: s3, sns, etc.