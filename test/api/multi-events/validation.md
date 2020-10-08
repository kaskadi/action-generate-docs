# API endpoints

The origin and root path for this API is: `https://API_DOMAIN`

The following endpoints are defined in this API:
- [/](#/)
- [/{proxy+}](#/{proxy+})

## `/` <a name="/"></a>

Supported methods:
- [GET](#/-GET)

### `GET` (target lambda → [hello-world](#hello-world)) <a name="/-GET"></a>

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

**Examples:**

No examples found for this method.

## `/{proxy+}` <a name="/{proxy+}"></a>

Supported methods:
- [GET](#/{proxy+}-GET)

### `GET` (target lambda → [hello-world](#hello-world)) <a name="/{proxy+}-GET"></a>

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

**Examples:**

No examples found for this method.

# API resources

The following lambda functions are used in this API:
- [hello-world](#hello-world)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                             | Timeout |                  Handler                  |
| :---------: | :---------------------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                |
| :----------- | :------------------- |
| app          | your-app-name        |
| service      | template-kaskadi-api |
| logical-unit | api-logical-unit     |
| type         | s3, sns, etc.        |