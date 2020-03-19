# run-ahead

An in-memory text search engine that does fuzzy matching on entries.

## Install

Install the package via `npm`:

```bash
$ npm install run-ahead
```

Then import the package to your project:

- in `node`:

```javascript
const engine = require("run-ahead");
const e = engine.runAhead({
  // configuration settings here ...
});
```

- in frontend framework:

```javascript
import engine from 'run-ahead';

export default class MyClass {
  constructor() {
    this.e = engine.runAhead({
      // configuration settings here ...
    });
  }
}
```

## Public APIs

- `add`:

- `query`:

- `reset`:

- `replaceOptions`: 

- `setOption`:


## Configuration Options

- `token`:

- `tokenType`:

- `cacheCapacity`:

- `remote`:


### Remote Configurations