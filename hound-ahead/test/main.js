'use strict'

const path = require('path');
const engine = require(path.resolve(__dirname, '../dist/search'));
const e = engine.searchEngine();

e.add('what about the apple?');

console.log('result:', e.find('app'));
