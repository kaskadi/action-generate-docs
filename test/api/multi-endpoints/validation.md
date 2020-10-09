# API endpoints

The origin and root path for this API is: `https://API_DOMAIN`

The following endpoints are defined in this API:
- [/again](#/again)
- [/hello](#/hello)
- [/again/hello](#/again/hello)
- [/hello/again](#/hello/again)

## `/again` <a name="/again"></a>

Supported methods:
- [GET](#again-GET)

### `GET` (target lambda → [again](#again)) <a name="again-GET"></a>

**Description:**

placeholder endpoint

**Authorization:**

No authorizer found for this method.

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

## `/hello` <a name="/hello"></a>

Supported methods:
- [GET](#hello-GET)

### `GET` (target lambda → [hello-world](#hello-world)) <a name="hello-GET"></a>

**Description:**

placeholder endpoint

**Authorization:**

No authorizer found for this method.

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

## `/again/hello` <a name="/again/hello"></a>

Supported methods:
- [GET](#again/hello-GET)

### `GET` (target lambda → [again-hello-world](#again-hello-world)) <a name="again/hello-GET"></a>

**Description:**

placeholder endpoint

**Authorization:**

No authorizer found for this method.

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

## `/hello/again` <a name="/hello/again"></a>

Supported methods:
- [GET](#hello/again-GET)

### `GET` (target lambda → [hello-world-again](#hello-world-again)) <a name="hello/again-GET"></a>

**Description:**

placeholder endpoint

**Authorization:**

No authorizer found for this method.

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
- [again](#again)
- [again-hello-world](#again-hello-world)
- [hello-world-again](#hello-world-again)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.

## again <a name="again"></a>

|  Name | Sources                | Timeout |               Handler               |
| :---: | :--------------------- | :-----: | :---------------------------------: |
| again | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/again/index.js) |

See [configuration file](./serverless.yml) for more details.

## again-hello-world <a name="again-hello-world"></a>

|        Name       | Sources                | Timeout |                     Handler                     |
| :---------------: | :--------------------- | :-----: | :---------------------------------------------: |
| again-hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/again-hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.

## hello-world-again <a name="hello-world-again"></a>

|        Name       | Sources                | Timeout |                     Handler                     |
| :---------------: | :--------------------- | :-----: | :---------------------------------------------: |
| hello-world-again | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world-again/index.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                |
| :----------- | :------------------- |
| app          | your-app-name        |
| service      | template-kaskadi-api |
| logical-unit | api-logical-unit     |
| type         | s3, sns, etc.        |