# What is this lambda for?

This is a template

# Details

|           Name          | Sources                | Timeout |                 Handler                 | Destinations                                                                                      |
| :---------------------: | :--------------------- | :-----: | :-------------------------------------: | :------------------------------------------------------------------------------------------------ |
| template-kaskadi-lambda | <ul><li>HTTP</li></ul> | default | [handler](./template-kaskadi-lambda.js) | <ul><li>On success: someOtherFunction</li><li>On failure: arn:of:some:existing:resource</li></ul> |

See [lambda configuration file](./serverless.yml) for more details.