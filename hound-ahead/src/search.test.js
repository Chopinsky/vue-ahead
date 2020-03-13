const e = require('./search').indexEngine();

describe('index search engine tests', () => {
  beforeAll(() => {
    // must set token before adding entries
    e.setOption('token', /[ ?,.]/g);

    // base dict set to test with
    e.add('what about the apple?');
    e.add('how that be an application, in the constitution ...');
    e.add('Note: Jest documentation uses yarn commands, but npm will also work');
  });

  afterAll(() => {
    e.reset();
  });

  test('match', () => {
    let { matches } = e.find('th app');
    
    expect(matches.length).toBe(2);
    expect(matches[0].source).toBe('what about the apple?');
    expect(matches[1].source).toBe('how that be an application, in the constitution ...');
  });

  test('mismatch', () => {
    let { matches } = e.find('th in app') || {};
    expect(matches).toBeNull();
  });

  test('match on new entries', () => {
    e.add(' the before and after blocks only apply to the tests within that describe block.   ');
    
    let { matches } = e.find('th an af app');
  
    expect(matches.length).toBe(1);
    expect(matches[0].source).toBe(' the before and after blocks only apply to the tests within that describe block.   ');
  });
});

describe('global token vs. scoped token', () => {
  beforeAll(() => {
    // must set token before adding entries
    e.setOption('token', /[ ?,.]/g);

    // base dict set to test with, scoped token will override the global token 
    e.add('what/about/the/apple/?', '/');

    // if no override, use the global token set
    e.add('how that be an application, in the constitution ...');
    e.add('Note: Jest documentation uses yarn commands, but npm will also work');
  });

  afterAll(() => {
    e.reset();
  });

  test('match on all', () => {
    let { matches } = e.find('th app');
    
    expect(matches.length).toBe(2);
    expect(matches[0].source).toBe('what/about/the/apple/?');
    expect(matches[1].source).toBe('how that be an application, in the constitution ...');
  });
});
