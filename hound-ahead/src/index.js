const axios = require('axios').default;

const search = require('./search').indexEngine;

const AheadEngine = function (options) {
  let s = search();
  return {};
};

exports.AheadEngine = AheadEngine;
