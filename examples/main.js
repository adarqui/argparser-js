var ArgParser = require("../index.js");

var results = ArgParser.parse(ArgParser.defaultParseOptions, "  --name name  --desc desc    --command   \"hello world\"  --single-quotes 'single quotes'  --mixed-quotes \"mixed 'quotes'\" a b c 'd' 'e' \"f\" \"    g    \" \"\" '' boom  --dir /tmp/dir");

console.log(results);
