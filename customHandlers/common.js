const path = require("path");

/** @param {string} inputPath */
const resolveInputPath = (inputPath) => path.join(process.cwd(), inputPath);

module.exports = { resolveInputPath };
