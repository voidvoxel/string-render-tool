# string-render-tool

A tool used to render strings of text into images.

## Installation

### CLI tool

```sh
npm i -g string-render-tool
```

### Library

```sh
npm i string-render-tool
```

### Dev Dependency

```sh
npm i -D string-render-tool
```

## Usage

### CLI tool

```sh
const
```

### Library

```js
const { StringRenderTool } = require("string-render-tool");

const stringRenderer = new StringRenderTool({ fontSize: 12 });

stringRenderer.render({ output: "hello_world.png", string: "Hello, world!" });
```

### Dev Dependency

```json
{

}
```
