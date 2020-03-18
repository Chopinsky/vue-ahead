'use strict'

const path = require('path');
const cache = require(path.resolve(__dirname, '../src/cache')).cache;

const c = cache({ capacity: 4 });

// add contents
c.push('ab');
c.push('bc');
c.push('cd');
c.push('de');

// move 'bc' to the front
c.hit('bc');

// insert 'fg' to the front
c.push('ef');

// false hit
c.hit('ab');

// output
c._debug();
