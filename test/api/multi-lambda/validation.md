# API endpoints

The following endpoints are defined in this API:
- [/{id}](#/{id})

## `/{id}` <a name="/{id}"></a>

Supported methods:
- [GET](#/{id}-GET)
- [DELETE](#/{id}-DELETE)
- [POST](#/{id}-POST)

### `GET` (target lambda → [get-item](#get-item)) <a name="/{id}-GET"></a>

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

_Example request:_

```HTTP
GET /{id}?key1=key1_value&key2=key2_value

{
  "param1": "param1_value",
  "param2": "param2_value"
}
```

### `DELETE` (target lambda → [delete-item](#delete-item)) <a name="/{id}-DELETE"></a>

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

_Example request:_

```HTTP
DELETE /{id}?key1=key1_value&key2=key2_value

{
  "param1": "param1_value",
  "param2": "param2_value"
}
```

### `POST` (target lambda → [post-item](#post-item)) <a name="/{id}-POST"></a>

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

_Example request:_

```HTTP
POST /{id}?key1=key1_value&key2=key2_value

{
  "param1": "param1_value",
  "param2": "param2_value"
}
```

# API resources

The following lambda functions are used in this API:
- [get-item](#get-item)
- [delete-item](#delete-item)
- [post-item](#post-item)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)._

## get-item <a name="get-item"></a>

|   Name   | Sources                | Timeout |                 Handler                |
| :------: | :--------------------- | :-----: | :------------------------------------: |
| get-item | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/get-item/index.js) |

See [configuration file](./serverless.yml) for more details.

## delete-item <a name="delete-item"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| delete-item | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/delete-item/index.js) |

See [configuration file](./serverless.yml) for more details.

## post-item <a name="post-item"></a>

|    Name   | Sources                | Timeout |                 Handler                 |
| :-------: | :--------------------- | :-----: | :-------------------------------------: |
| post-item | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/post-item/index.js) |

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                |
| :----------- | :------------------- |
| app          | your-app-name        |
| service      | template-kaskadi-api |
| logical-unit | api-logical-unit     |
| type         | s3, sns, etc.        |