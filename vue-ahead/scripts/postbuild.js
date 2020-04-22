'use strict';

const fs = require('fs');
const path = require('path');

const dest = path.resolve(__dirname, '../dist/vue-ahead.min.js');
const htmlLibLoc = path.resolve(__dirname, '../../html-example/library/vue-ahead.min.js');

if (!fs.existsSync(dest)) {
  console.error(`the library build for vue-ahead.min.js can't be located at: ${dest} ...\n aborting ... `);

  return;
}

let content = fs.readFileSync(dest).toString();
if (!content) {
  console.error(`unable to read contents from ${dest} ...\n aborting ... `);

  return;
}

if (!content.startsWith('var axios')) {
  content = 'var axios = window.axios || null;\r\n' + content;
  fs.writeFileSync(dest, content);
}

fs.writeFileSync(htmlLibLoc, content);

console.log('post build done ... ');
