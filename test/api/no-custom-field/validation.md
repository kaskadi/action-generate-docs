# API endpoints

The following endpoints are defined in this API:
- [/hello](#/hello)

## `/hello` (target lambda → [hello-world](#hello-world))

Supported methods:
- [GET](#GET)

### `GET`

**Description:**

No Description found for this method...

**Query string parameters:**

No Query String Parameters found for this method...

**Request body:**

No Body found for this method...

_Example request:_

```HTTP
GET /hello
```

# API resources

The following lambda functions are used in this API:
- [hello-world](#hello-world)

The following layers are used in this API:
_no layer defined in the [configuration file](./serverless.yml)..._

## hello-world <a name="hello-world"></a>

|     Name    | Sources                | Timeout |                  Handler                  |
| :---------: | :--------------------- | :-----: | :---------------------------------------: |
| hello-world | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/hello-world/index.js) |

See [configuration file](./serverless.yml) for more details.