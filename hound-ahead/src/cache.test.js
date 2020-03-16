const c = require('./cache').cache({ capacity: 4 });

/**
 * Note that for the cache test, the order of the tests being run is important because
 * of the side effects, as a recent hit will move the token up, and adding new tokens 
 * will push out the tokens at the end of the cach list.
 */
describe('cache engine tests', () => {
  beforeAll(() => {
    c.insert('ab', 1);
    c.insert('bc', 2);
    c.insert('cd', 3);
    c.insert('de', 4);
  });

  afterAll(() => {
    c.clear();
  });

  test('hit', () => {
    let result = c.hit('cd');
    expect(result).toBe(3);
  });

  test('miss', () => {
    
  })

});