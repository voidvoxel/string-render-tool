const { StringRenderTool } = require("../src");

const stringRenderer = new StringRenderTool({ fontSize: 12 });

stringRenderer.render({ output: "hello_world.png", string: "Hello, world!" });
