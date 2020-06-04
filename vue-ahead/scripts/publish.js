'use strict';

const pages = require('gh-pages');
const path = require('path');

const dest = path.resolve(__dirname, "../docs/.vuepress/dist");
console.log('publishing docs from:', dest);

pages.publish(dest, function (err) {
  console.error(err);
});
