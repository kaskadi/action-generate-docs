# Resources documentation

The following lambda functions are defined in this repository:
- [template-kaskadi-lambda](#template-kaskadi-lambda)

The following layers are defined in this repository:
- [template-kaskadi-layer](#template-kaskadi-layer)

## template-kaskadi-lambda <a name="template-kaskadi-lambda"></a>

|           Name          | Sources                | Timeout |                 Handler                 | Layers                                                                                                                                                                                                                                                                                                                                             |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>[template-kaskadi-layer](#template-kaskadi-layer)</li><li>[template-kaskadi-layer](#template-kaskadi-layer)</li><li>just-for-testing</li><li>just-for-testing</li><li>`Fn::GetAtt: ["TemplateKaskadiLayerLambdaLayer","Arn"]` _(defined via intrinsic function)_</li><li>test-layer _(defined via ARN)_</li><li>just-for-testing</li></ul> |

See [configuration file](./serverless.yml) for more details.

## template-kaskadi-layer <a name="template-kaskadi-layer"></a>

### Description

No description found for this layer.

### Dependencies

- `chai`, version: `^4.2.0` ([see on NPM](https://www.npmjs.com/package/chai))
- `mocha`, version: `^8.1.3` ([see on NPM](https://www.npmjs.com/package/mocha))
- `standard`, version: `^14.3.4` ([see on NPM](https://www.npmjs.com/package/standard))

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                   |
| :----------- | :---------------------- |
| app          | your-app-name           |
| service      | template-kaskadi-lambda |
| logical-unit | api-logical-unit        |
| type         | s3, sns, etc.           |