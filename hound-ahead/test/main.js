'use strict'

const path = require('path');
const engine = require(path.resolve(__dirname, '../src/search'));
const e = engine.indexEngine({
    token: /[ ?,.]/,
});

e.add('what about the apple?');
e.add('how that be an application, in the constitution');

console.log('result:', e.find('th int app?'));
