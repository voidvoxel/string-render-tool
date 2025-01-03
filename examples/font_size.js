const { StringRenderTool } = require("../src");

const stringRenderer = new StringRenderTool({ fontSize: 64 });

stringRenderer.render({ output: "example.png", string: "WWWWWWWWWWWWWWWW" });
