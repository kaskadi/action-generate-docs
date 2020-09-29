# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)
- [my-function](#my-function)

The following layers are defined in this repository:
_no layer defined in the [configuration file](./serverless.yml)..._

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                | Timeout |                 Handler                 | Destinations                                                                                                                                           |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>On success: [my-function](#my-function)</li><li>On failure: `Fn::GetAtt: ["SomeResources","Arn"]` _(defined via intrinsic function)_</li></ul> |

See [configuration file](./serverless.yml) for more details.

## my-function <a name="my-function"></a>

|     Name    | Sources           | Timeout |                 Handler                 |
| :---------: | :---------------- | :-----: | :-------------------------------------: |
| my-function | No source defined | default | [handler](./template-kaskadi-lambda.js) |

See [configuration file](./serverless.yml) for more details.