class NativeEngine {
  constructor(props) {
    this._props = props;
    this._store = [];
  }

  add = data => {
    if (!Array.isArray(data) || !data.length) {
      return;
    }

    this._store.push(...data);
  }

  query = val => {
    if (typeof val !== 'string') {
      val = val.toString();
    }

    return this._store
      .filter(data => data.source && data.source.indexOf(val) >= 0)
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

  find = (val, cb) => {
    if (this._debounce) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = setTimeout(() => {
      clearTimeout(this._debounce);
      this._debounce = null;

      cb(this._engine.query(val));
    }, 36);
  }
}