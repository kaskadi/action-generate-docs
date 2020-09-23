# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)

The following layers are defined in this repository:
_no layer defined in the configuration file..._

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                | Timeout |                 Handler                 | Destinations                                                                                      |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :------------------------------------------------------------------------------------------------ |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>On success: someOtherFunction</li><li>On failure: arn:of:some:existing:resource</li></ul> |

See [configuration file](./serverless.yml) for more details.