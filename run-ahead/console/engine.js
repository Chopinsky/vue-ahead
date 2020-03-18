"use strict";

const path = require("path");
const fs = require("fs");
const engine = require(path.resolve(__dirname, "../src/index"));
const input = process.argv.splice(2);

if (!Array.isArray(input) || !input.length) {
  console.error("no search term is found ... ");
  return;
}

const searchTerm = input[0];
const configPath = input[1];
const dataPath = input[2];

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

const config = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, configPath || "./examples/config.json")
  ) || {}
);

const { data } = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, dataPath || "./examples/data.json")
  ) || { data: null }
);

// convert the string into RegExp
if (config.tokenType === 'regex') {
  config.token = new RegExp(config.token);  
}

const e = engine.runahead({
  ...config,
  dataParser,
});

e.add(data);

e.query(searchTerm, function(output, _data) {
  if (!Array.isArray(output.matches)) {
    console.error("no matches is found for:", query);
    return;
  }

  let labels = {
    unknown: []
  };

  output.matches.forEach(item => {
    const loc = (item.extra && item.extra.location) || "";
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
  console.log("tokens:", output.tokens);
});
