# API endpoints

The following endpoints are defined in this API:
- [/hello](#/hello)

## `/hello` (target lambda → [hello-world](#hello-world))

Supported methods:
- [GET](#GET)

### `GET`

placeholder endpoint

|   Key  | Default | Description |
| :----: | :-----: | :---------- |
| `key1` |         | first key   |
| `key2` |   `35`  | second key  |

|    Key   | Default | Description       |
| :------: | :-----: | :---------------- |
| `param1` | `hello` | first body param  |
| `param2` |  `true` | second body param |

_Example:_

```HTTP
GET /hello?key1=key1_value&key2=key2_value

{
  "param1": "param1_value",
  "param2": "param2_value"
}
```

# API resources

The following lambda functions are used in this API:
- [hello-world](#hello-world)

The following layers are used in this API:
_no layer defined in the configuration file..._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.