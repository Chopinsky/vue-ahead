const s = require('./search').indexEngine({
    token: /[ ?,.]/,
});

s.add('what about the apple?');
s.add('how that be an application, in the constitution ...');
s.add('Note: Jest documentation uses yarn commands, but npm will also work');

describe('index search engine test', () => {
  test('match', () => {

  });
});
