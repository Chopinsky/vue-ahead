'use strict'

const path = require('path');
const cache = require(path.resolve(__dirname, '../src/cache')).cache;

const c = cache({ capacity: 4 });

// add contents
c.insert('ab');
c.insert('bc');
c.insert('cd');
c.insert('de');

// move 'bc' to the front
c.hit('bc');

// insert 'fg' to the front
c.insert('ef');

// false hit
c.hit('ab');

// output
c._debug();
