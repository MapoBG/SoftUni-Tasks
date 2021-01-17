const homeHandler = require("./home");
const staticFiles = require("./static-handler");
const catsHandler = require("./cats");

module.exports = [homeHandler, staticFiles, catsHandler];