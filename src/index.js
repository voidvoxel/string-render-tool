const { existsSync } = require("node:fs");
const path = require("node:path");

const rl = require("raylib");

const MINIMUM_FONT_SIZE = 12;

const DEFAULT_STRING_RENDER_FONT_SIZE = MINIMUM_FONT_SIZE;
const DEFAULT_STRING_RENDER_HEIGHT = 12;
const DEFAULT_STRING_RENDER_WIDTH = 256 + 128 + 64;

const PNG_FILE_EXTENSION = ".png";

/**
 * This is a string of the capital letter W repeated for as many letters as there are in the word pneumonoultramicroscopicsilicovolcanoconiosis.
 *
 * @type {string}
 */
const TEST_STRING = "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW";

function optionsChangeWindow (options) {
    return options.fontSize  ||  options.height  ||  options.width;
}

class StringRenderTool {
    #fontSize;
    #height;
    #_string;
    #width;

    get height () {
        return this.#height ?? DEFAULT_STRING_RENDER_HEIGHT;
    }

    set height (value) {
        this.#setHeight(value);
        this.#reloadWindow();
    }

    #setHeight (value) {
        value ??= this.fontSize;

        if (typeof value !== "number"  ||  !Number.isInteger(value)  ||  value < 1) {
            value = this.fontSize;
        }

        this.#height = value;
    }

    get fontSize () {
        return this.#fontSize ?? MINIMUM_FONT_SIZE;
    }

    set fontSize (value) {
        this.#setFontSize(value);
        this.#reloadWindow();
    }

    #setFontSize (value) {
        value ??= MINIMUM_FONT_SIZE;

        if (value < MINIMUM_FONT_SIZE) {
            value = MINIMUM_FONT_SIZE;
        }
    }

    get #string () {
        return this.#_string ?? " ";
    }

    set #string (value) {
        this.#setString(value);
        this.#reloadWindow();
    }

    #setString (value) {
        if (typeof value !== "string") {
            if (value) {
                value = value.toString();
            }
            else {
                value = "";
            }
        }

        this.#_string = value;
    }

    get width () {
        let width = this.#width;

        if (typeof width !== "number" || width) {
            this.#width = this.#getDefaultWidth();
        }

        return this.#width;
    }

    set width (value) {
        this.#setWidth(value);
        this.#reloadWindow();
    }

    #setWidth (value) {
        this.#width = this.#getDefaultWidth(value);
    }

    #getDefaultWidth (value) {
        value ??= NaN;

        if (!Number.isInteger(value)  ||  value < 1) {
            value = Math.round(
                this.#getStringPixelWidth(this.#string)
            );
        }

        return value;
    }

    constructor (options = {}) {
        rl.SetTraceLogLevel(rl.LOG_ERROR);

        if (options.fontSize) {
            this.#setFontSize(options.fontSize);
        }

        if (options.height) {
            this.#setHeight(options.height);
        }

        if (options.width) {
            this.#setWidth(options.width ?? null);
        }

        this.#openWindow();
    }

    #canStringFit (string) {
        return this.#getStringPixelWidth(string) > this.width;
    }

    #getStringPixelWidth (string) {
        return string.length * 0.75 * this.fontSize;
    }

    render (options = {}) {
        options ??= {};

        this.#setString(options.string);

        if (options.fontSize) {
            this.#setFontSize(options.fontSize);
        }

        if (options.height) {
            this.#setHeight(options.height);
        }

        if (options.width) {
            this.#setWidth(options.width);
        }

        console.debug({
            width: this.width,
            height: this.height,
            fontSize: this.fontSize
        });

        if (optionsChangeWindow(options)  ||  !this.#canStringFit(options.string)) {
            this.#reloadWindow();
        }

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

        const draw = () => {
            rl.BeginDrawing();
            rl.ClearBackground(rl.BLACK);
            rl.DrawText(this.#string, 0, 0, this.fontSize, rl.WHITE);
            rl.EndDrawing();
        };

        if (typeof output === "string") {
            draw();
            rl.TakeScreenshot(output);
        }
        else {
            while (!rl.WindowShouldClose()) {
                draw();
            }
        }
    }

    close () {
        this.#closeWindow();
    }

    #closeWindow () {
        // Close the window.
        rl.CloseWindow();
    }

    #openWindow () {
        // Create the window.
        rl.InitWindow(this.width, this.height, "String Render Tool");
    }

    #reloadWindow () {
        this.#closeWindow();
        this.#openWindow();
    }
}

module.exports = {
    DEFAULT_STRING_RENDER_HEIGHT,
    DEFAULT_STRING_RENDER_WIDTH,
    TEST_STRING,
    StringRenderTool
};
