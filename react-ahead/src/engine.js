import axios from 'axios';

class NativeEngine {
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

  add = data => {
    if (!Array.isArray(data) || !data.length) {
      return;
    }

    this._store.push(...data);
  }

  query = (val, cb) => {
    if (typeof val !== 'string') {
      val = val.toString();
    }

    let data;

    //TODO: implement load more option

    if (this._cache.data.hasOwnProperty(val)) {
      data = this._cache.data[val];

      let index = this._cache.last.indexOf(val);
      if (index >= 0) {
        this._cache.last.splice(index, 1);
        this._cache.last.push(val);
      }

    } else if (!this._props.remote) {
      data = this._store
        .filter(data => data.source && data.source.indexOf(val) >= 0);

      this._cache.last.push(val);
      this._cache.data[val] = data;

      if (this._cache.last.length > this._props.cacheSize) {
        let [ delKey ] = this._cache.last.splice(0, 1);
        delete this._cache.data[delKey];
      }
    } else {
      const params = {
        q: val,
      };

      const {
        dataParser,
        ...settings
      } = this._props.remote;

      axios(Object.assign({}, settings, { params }))
        .then(resp => {
          // format data if a formatter is passed
          let data =
            typeof dataParser === 'function'
              ? dataParser(resp.data)
              : resp.data;

          cb(data, val);
        })
        .catch(err => {
          console.error("[error] failed to fetch data from remote server:", err);
        });

      return;
    }

    return cb(data, val);
  } 

  setOptions = options => {
    this._props = options;
  };

  setOption = (name, option) => {
    this._props[name] = option;
  };
}

export default class SearchEngine {
  constructor(props) {
    this._engine = null;
    this._debounce = null;

    if (props && props.engine) {
      this._engine = props.engine;
    } else {
      this._engine = new NativeEngine(props);
    }
  }

  add = data => {
    if (!data) {
      return;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    let d = data.map(item => {
      if (!item) {
        return;
      }

      const type = typeof item;
      if (type === 'number' || type === 'string') {
        return { source: item.toString() };
      }

      return { ...item, source: item['source'].toString() };
    });

    this._engine.add(d);
  };

  find = (val, isRemote, cb) => {
    if (this._debounce) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    const timeout = isRemote ? 200 : 40;

    this._debounce = setTimeout(() => {
      clearTimeout(this._debounce);
      this._debounce = null;

      this._engine.query(val, cb);
    }, timeout);
  };

  setOptions = options => {
    this._engine.setOptions(options);
  };

  setOption = (name, option) => {
    this._engine.setOption(name, option);
  };
}