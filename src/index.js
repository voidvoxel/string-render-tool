const { existsSync } = require("node:fs");
const path = require("node:path");

const rl = require("raylib");

const DEFAULT_STRING_RENDER_WIDTH = 256 + 128 + 64;
const DEFAULT_STRING_RENDER_HEIGHT = 12;

const PNG_FILE_EXTENSION = ".png";

/**
 * This is a string of the capital letter W repeated for as many letters as there are in the word pneumonoultramicroscopicsilicovolcanoconiosis.
 *
 * @type {string}
 */
const TEST_STRING = "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW";

class StringRenderTool {

    renderSync (options = {}) {
        options ??= {};

        const height = options.height ?? DEFAULT_STRING_RENDER_HEIGHT;
        const string = options.string ?? "";
        const width = options.width ?? DEFAULT_STRING_RENDER_WIDTH;

        let output = options.output ?? null;

        if (output === "") {
            output = null;
        }

        if (typeof output === "string" && !output.endsWith(PNG_FILE_EXTENSION)) {
            output += PNG_FILE_EXTENSION;
        }

        // If the directory of the output file does not exist:
        if (output) {
            const outputDirectory = path.dirname(output);

            if (!existsSync(outputDirectory)) {
                throw new Error(`Directory not found: "${outputDirectory}"`);
            }
        }

        // Create the window.
        rl.InitWindow(width, height, "String Render Tool");

        function draw () {
            rl.BeginDrawing();
            rl.ClearBackground(rl.BLACK);
            rl.DrawText(string, 0, 0, height, rl.WHITE);
            rl.EndDrawing();
        }

        if (typeof output === "string") {
            draw();
            rl.TakeScreenshot(output);
        }
        else {
            while (!rl.WindowShouldClose()) {
                draw();
            }
        }

        // Close the window.
        rl.CloseWindow();
    }
}

module.exports = {
    DEFAULT_STRING_RENDER_HEIGHT,
    DEFAULT_STRING_RENDER_WIDTH,
    TEST_STRING,
    StringRenderTool
};
