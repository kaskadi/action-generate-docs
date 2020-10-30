# Usage instructions

In another element:
```js
// using the latest version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-custom-element/kaskadi-custom-element.js'
// using a specific version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-custom-element/release/v1.0.0/kaskadi-custom-element.js'
```

In the browser:
```html
<!-- using the latest version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-custom-element/kaskadi-custom-element.js"></script>
<!-- using a specific version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-custom-element/release/v1.0.0/kaskadi-custom-element.js"></script>
```

# Custom element documentation

## kaskadi-custom-element

Template element for the Kaskadi application


| Param | Type | Description |
| --- | --- | --- |
| lang | `string` | element's language |
| title | `string` | element's title |

**Example**  
```html
<kaskadi-custom-element title="Welcome!" lang="en"></kaskadi-custom-element>
```
<!-- LINKS -->

## Custom styles

The following custom CSS properties are available for this element:

| CSS property name  | Default |
| :----------------- | :-----: |
| --icon-size        |  `56px` |
| --background-color |         |
| --outline-color    |         |
| --head-color       |         |
| --day-color        |         |
| --month-color      |         |
| --name-color       |         |