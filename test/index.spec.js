"use strict";



var
  chai = require("chai"),
  should = chai.should(),
  ArgParser = require("../index.js")
  ;



describe("ArgParser", function() {
  it("When parsing a tricky string", function() {
    ArgParser.parse(ArgParser.defaultParseOptions,
"  --name name  --desc desc    --command   \"hello world\"  --single-quotes \
'single quotes'  --mixed-quotes \"mixed 'quotes'\" a b c 'd' 'e' \"f\" \"   \
 g    \"\"\" '' boom  --dir /tmp/dir").should.eql(
  [ '--name',
    'name',
    '--desc',
    'desc',
    '--command',
    'hello world',
    '--single-quotes',
    'single quotes',
    '--mixed-quotes',
    'mixed \'quotes\'',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '    g    ',
    '',
    '',
    'boom',
    '--dir',
    '/tmp/dir' ]
  );
  });

  it("When parsing a tricky string with hyphens as spaces", function() {
    ArgParser.parse(ArgParser.createParseOptions(["-"], ['"']),
"  --name name  --desc desc    --command   \"hello world\"  --single-quotes \
'single quotes'  --mixed-quotes \"mixed 'quotes'\" a b c 'd' 'e' \"f\" \"   \
 g    \"\"\" '' boom  --dir /tmp/dir").should.eql(
  ["  ","name name  ","desc desc    ","command   ","hello world","  ","single","quotes 'single quotes'  ","mixed","quotes ","mixed 'quotes'", " a b c 'd' 'e' ","f"," ","    g    ",""," '' boom  ","dir /tmp/dir"])
  });
});
