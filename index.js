(function() {
"use strict";



var
  _ = require("lodash")
  ;



_.elem = function(arr, c) {
  return _.find(arr, function(c_) { return c_ == c; });
};



var
  NONE  = 0,
  CHAR  = 1,
  QUOTE = 2
  ;



var parseOptions = {
  spaces: [],
  quotes: []
};



var parseState = {
  quoteChar: ""
};



var defaultParseOptions = {
  spaces: [" "],
  quotes: ["\"", "\'"]
};



var defaultParseState = {
  quoteChar: "\""
};



var createParseOptions = function(spaces, quotes) {
  return {
    spaces: spaces,
    quotes: quotes
  };
};



var parse = function(parse_options, line) {
  return (
    _.map(parse_(NONE, defaultParseState, parse_options, [], _.toArray(line)), function(argv) {
      return _.join(argv, "");
    })
  );
};



var parse_ = function(parse_state_type, parse_state, parse_options, accum, line) {

  if (_.isEmpty(line)) {
    return accum;
  }

  var h = _.head(line);

  switch (parse_state_type) {

    case NONE: {
      var rest = _.dropWhile (line, function(c) { return _.elem(parse_options.spaces, c); });

      var pst = function() {
        if (_.elem(parse_options.quotes, _.head(rest))) {
          return QUOTE;
        } else {
          return CHAR;
        }
      };

      return parse_ (pst(), parse_state, parse_options, accum, rest);
    }

    case CHAR: {
      var char = _.takeWhile (line, function(c) {
        return (!_.elem(parse_options.spaces, c) && !_.elem(parse_options.quotes, c));
      });

      var rest = _.dropWhile (line, function(c) {
        return (!_.elem(parse_options.spaces, c) && !_.elem(parse_options.quotes, c));
      });

      return parse_ (NONE, parse_state, parse_options, _.concat(accum, [char]), rest);
    }

    case QUOTE: {
      var t = _.tail(line);
      var quote = _.takeWhile (t, function(c) { return c != h; });
      var rest = _.dropWhile (t, function(c) { return c != h; });
      return parse_ (NONE, parse_state, parse_options, _.concat(accum, [quote]), _.tail(rest));
    }

  }
};



module.exports = {
  defaultParseOptions: defaultParseOptions,
  createParseOptions: createParseOptions,
  parse: parse
};
})();
