# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)

The following layers are defined in this repository:
_no layer defined in the [configuration file](./serverless.yml)._

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                                           | Timeout |                 Handler                 |
| :---------------------: | :------------------------------------------------ | :-----: | :-------------------------------------: |
| template-kaskadi-lambda | <ul><li>HTTP (GET)</li><li>event bridge</li></ul> | default | [handler](./template-kaskadi-lambda.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                   |
| :----------- | :---------------------- |
| app          | your-app-name           |
| service      | template-kaskadi-lambda |
| logical-unit | api-logical-unit        |
| type         | s3, sns, etc.           |