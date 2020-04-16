const axios = require("axios");

export default class NativeEngine {
  constructor(props) {
    this._props = props || {};

    this._store = [];
    this._cache = {
      last: [],
      data: {},
    };

    if (!this._props['cacheSize']) {
      this._props['cacheSize'] = 10;
    }
  }

  add(data = []) {
    if (!Array.isArray(data) || !data.length) {
      const label = data.toString();
      this._store.push({ label: label, key: label });
      return;
    }

    this._store.push(...data);
  };

  query(val, cb) {
    if (typeof val !== 'string') {
      val = val.toString();
    }

    val = val.toLowerCase();

    //TODO: implement load more option

    // cache hit
    if (this._cache.data.hasOwnProperty(val)) {
      const data = this._cache.data[val];

      let index = this._cache.last.indexOf(val);
      if (index >= 0) {
        this._cache.last.splice(index, 1);
        this._cache.last.push(val);
      }

      return cb(data, val);
    } 
    
    // remote search 
    if (this._props.remote) {
      const params = {
        q: val,
      };

      const {
        dataParser,
        settings,
      } = this._props.remote;

      axios(Object.assign({}, settings, { params }))
        .then(resp => {
          // format data if a formatter is passed
          const data =
            typeof dataParser === 'function'
              ? dataParser(resp.data)
              : resp.data;

          cb(data, val);
        })
        .catch(err => {
          console.error("[error] failed to fetch data from remote server:", err);
        });

      return null;
    } 

    // normal search workflow
    let { matchEval } = this._props;
    if (typeof matchEval !== 'function') {
      matchEval = null;
    }

    const data = 
      this._store
        .filter(data => {
          if (matchEval) {
            return matchEval(val, data);
          }

          const label = data.label.toLowerCase();
          return label && label.indexOf(val) >= 0;
        });

    this._cache.last.push(val);
    this._cache.data[val] = data;

    if (this._cache.last.length > this._props.cacheSize) {
      let [delKey] = this._cache.last.splice(0, 1);
      delete this._cache.data[delKey];
    }

    return cb(data, val);
  };

  prefetch(cb) {
    if (!this._props.remote) {
      return;
    }

    const params = {
      q: '',
      t: 'prefetch',
    };

    const {
      dataParser,
      settings,
    } = this._props.remote;

    axios(Object.assign({}, settings, { params }))
      .then(resp => {
        // format data if a formatter is passed
        let data =
          typeof dataParser === 'function'
            ? dataParser(resp.data)
            : resp.data;

        cb(data);
      })
      .catch(err => {
        console.error("[error] failed to fetch data from remote server:", err);
      });
  };

  setOptions(options) {
    this._props = options;
  };

  setOption(name, option) {
    this._props[name] = option;
  };
}