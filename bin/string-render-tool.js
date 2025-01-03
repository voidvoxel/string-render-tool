
const { parseArgs } = require("node:util");

const { StringRenderTool } = require("../src");

async function main (args) {
    const strings = args.positionals;
    const {
        fontSize,
        height,
        output: outputs,
        width
    } = args.values;

    const stringRenderer = new StringRenderTool({
        fontSize,
        height,
        width
    });

    for (let i = 0; i < strings.length; i++) {
        const output = outputs[i];
        const string = strings[i];

        stringRenderer.render({
            output,
            string
        });
    }

    stringRenderer.close();
}

async function start (args) {
    try {
        await main(args);
    } catch (error) {
        if (args.values.debug) {
            throw error;
        }

        console.error(error.message);
        process.exit(1);
    }
}

const options = {
    debug: {
        type: "boolean",
        default: false,
        multiple: false
    },
    "font-size": {
        type: "string",
        default: "NaN",
        short: "s",
        multiple: false
    },
    height: {
        type: "string",
        default: "NaN",
        short: "h",
        multiple: false
    },
    output: {
        type: "string",
        default: [""],
        short: "o",
        multiple: true
    },
    width: {
        type: "string",
        default: "NaN",
        short: "w",
        multiple: false
    }
};

const args = parseArgs({
    allowNegative: true,
    allowPositionals: true,
    options
});

args.values.height = Math.round(Number.parseFloat(args.values.height));
args.values.width = Math.round(Number.parseFloat(args.values.width));

args.values.fontSize = args.values["font-size"]
args.values.fontSize = Math.round(Number.parseFloat(args.values.fontSize));

if (!Number.isInteger(args.values.fontSize)  ||  args.values.fontSize < 1) {
    args.values.fontSize = args.values.height;
}

start(args);
