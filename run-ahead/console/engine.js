"use strict";

const path = require("path");
const engine = require(path.resolve(__dirname, "../src/index"));
const query = process.argv[2];

if (!query) {
  console.log('no search term is found ... ');
  return;
}

const dataParser = data => {
  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return data.map(user => {
    return {
      source: `${user["name"]} (${user["screen_name"]})`,
      label: user["location"] || "en",
      extraData: { ...user },
    };
  });
};

const e = engine.houndAhead({
  token: /[ `'"$!=><{}?,.:;/|\[\]\(\)\\]/,
  remote: {
    url: "/search",
    baseURL: "https://typeahead-js-twitter-api-proxy.herokuapp.com/demo",
    timeout: 1000,  // timeout in 1000 ms
  },
  dataParser,
});

e.add({
  source: 'Rubinstein (Chopinsky999)',
  label: 'ru',
  extraData: null,
});

e.query(query, function(output, _data) {
  if (!Array.isArray(output.matches)) {
    console.error('no matches is found for:', query);
    return;
  }

  let labels = {
    unknown: []
  };

  output.matches.forEach(item => {
    const loc = (item.extra && item.extra.location) || '';
    const { source } = item;

    if (!loc) {
      labels["unknown"].push(source);
    } else if (labels[loc]) {
      labels[loc].push(source);
    } else {
      labels[loc] = [source];
    }
  });

  console.log("count:", output.matches.length);
  console.log("labels:", labels);

  return;
});
