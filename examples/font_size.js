const { StringRenderTool } = require("../src");

const stringRenderer = new StringRenderTool({ fontSize: 32 });

stringRenderer.render({ output: "example.png", string: "Hello, world!" });
