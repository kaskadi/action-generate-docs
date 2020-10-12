# API endpoints

The origin and root path for this API is: `https://API_DOMAIN`

The following endpoints are defined in this API:
- [/hello](#/hello)

## `/hello` <a name="/hello"></a>

Supported methods:
- [GET](#hello-GET)

### `GET` (target lambda → [hello-world](#hello-world)) <a name="hello-GET"></a>

**Description:**

No description found for this method.

**Authorization:**

No authorizer found for this method.

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

No body found for this method.

**Examples:**

No examples found for this method.

# API resources

The following lambda functions are used in this API:
- [hello-world](#hello-world)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                |
| :----------- | :------------------- |
| app          | your-app-name        |
| service      | template-kaskadi-api |
| logical-unit | api-logical-unit     |
| type         | s3, sns, etc.        |