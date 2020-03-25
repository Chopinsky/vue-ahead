const axios = require('axios').default;
const { indexEngine } = require('./search');

const dataType = {
  unknown: 0,
  local: 1,
  remote: 2,
  created: 3
};

exports.dataType = dataType;

const remoteType = {
  query: "query",
  sink: "sink",
  prefetch: "prefetch",
}

exports.remoteType = remoteType;

exports.runahead = (options, data, initDataType) => {
  if (data && !Array.isArray(data)) {
    throw new Error('the source data provided to the search engine must be an array, but got:', typeof data);
  }

  if (!data && (!options || !options.remote)) {
    throw new Error('you must provide either source data or the remote connection settings to use the engine');
  }

  let _engine = indexEngine({
    token: options.token,
    tokenType: options.tokenType,
    cacheCapacity: options.cacheCapacity,
  });
  
  let _createdItems = {};
  let _options = options;

  const send = (remote, type, callback) => {
    const { transport, dataParser } = _options;

    const provider =
      (transport && typeof transport.then === "function") || axios;

    provider(remote)
      .then(resp => {
        // format data if a formatter is passed
        let data =
          typeof dataParser === "function"
            ? dataParser(resp.data, remoteType.query)
            : resp.data;

        // now add newly obtained data to the index search engine
        if (data) {
          if (type === remoteType.query || type === remoteType.prefetch) {
            add(data["query"] || data, dataType.remote);
          }

          if (_createdItems && Array.isArray(data["created"])) {
            for (let i = 0; i < data["created"].length; i++) {
              delete _createdItems[data["created"][i]];
            }
          }
        }

        let extra = null;
        if (type === remoteType.query) {
          const target = (remote["params"] && remote["params"]["q"]) || "";
          extra = _engine.find(target);
        }

        callback(data, extra);
      })
      .catch(err => {
        console.error("[error]", err);
      });
  };

  const add = (dataToAdd, type) => {
    // only accepting objects
    if (typeof dataToAdd !== 'object' || !dataToAdd) {
      return;
    }

    // if an array, recursively add all items
    if (Array.isArray(dataToAdd)) {
      if (!dataToAdd.length) {
        return;
      }

      dataToAdd.forEach(item => {
        let d = _engine.add(item['source'], item['extraData']);
        
        if (type === dataType.created && d && d.key) {
          _createdItems[d.key] = d.data;
        }
      });

      return;
    }
    
    // if a sole object, only add this single entry
    let d = _engine.add(dataToAdd['source'], source, dataToAdd['extraData']);

    if (type === dataType.created && d && d.key) {
      _createdItems[d.key] = d.data;
    }
  };

  /**
   * 
   * @param {string} target 
   * @param {callback} remoteCallback 
   * @returns {(Object|null)} 
   *  the query function will find the query results matching the `target` parameter.
   *  - if no matching is found, the function will return null;
   *  - if found generate returned data in the following format;
   *    {
   *      matches: [
   *        { key: <required|string>, source: <required|string>, extraData: <optional|object> }, 
   *        ...,
   *      ],
   *      tokens: [
   *        token1: <string>, 
   *        token2: <string>, 
   *        ...
   *      ],
   *    }
   */
  const query = (target, remoteCallback) => {
    if (!target || typeof target !== 'string') {
      return null;
    }

    target = target.trim().toLowerCase();
    if (!target) {
      return null;
    }

    if (typeof remoteCallback === 'function' && _options.remote) {
      const { 
        remote, 
        queryBuilder, 
        dataBuilder, 
      } = _options; 

      remote["params"] = {
        ...remote["params"],
        q: target
      };

      if (typeof queryBuilder === 'function') {
        remote["params"] = queryBuilder(remote["params"], remoteType.query);
      }
      
      if (remote.syncCreated && Object.keys(_createdItems).length) {
        remote["data"] = {
          created: _createdItems,
        };        
      }

      if (typeof dataBuilder === 'function') {
        remote["transformRequest"] = [dataBuilder];
      }

      send(remote, remoteType.query, remoteCallback);
    }

    // returned data format:
    // {
    //    matches: [
    //      { key: <required|string>, source: <required|string>, extraData: <optional|object> }, 
    //      { ... },
    //    ],
    //    tokens: [
    //      token1: <string>, 
    //      token2: <string>, 
    //      ...
    //    ],
    // }
    return _engine.find(target);
  };

  const prefetch = (remote, extraData, prefetchCallback) => {
    if (!remote) {
      remote = _options.remote;
    }

    const {
      queryBuilder,
    } = _options;

    if (typeof queryBuilder === "function") {
      remote["params"] = queryBuilder(params, remoteType.sink);
    }

    if (extraData) {
      remote["data"] = {
        ...remote["data"],
        extraData,
      };
    }

    send(remote, remoteType.prefetch, prefetchCallback);
  };

  const sink = (remote, extraData, sinkCallback) => {
    if (!remote) {
      remote = _options.remote;
    }

    remote["data"] = {
      ...remote["data"],
      created: _createdItems || [],
    };      

    if (extraData) {
      remote["data"]["extraData"] = extraData;
    }
    
    if (typeof queryBuilder === "function") {
      remote["params"] = queryBuilder(params, remoteType.sink);
    }

    const {
      queryBuilder,
    } = _options;

    send(remote, remoteType.sink, sinkCallback);
  }

  const remove = source => {

  };

  const update = (source, data) => {

  };

  const reset = () => {
    let created = _createdItems;
    
    _createdItems = [];
    _engine.reset();

    return created;
  };

  const replaceOptions = options => {
    _options = options;

    _engine.replaceOptions({
      token: options.token,
      tokenType: options.tokenType,
      cacheCapacity: options.cacheCapacity,
    });
  };

  const setOption = (name, value) => {
    _options[name] = value;

    switch (name) {
      case 'token':
      case 'tokenType':
      case 'cacheCapacity':
        _engine.setOption(name, value);
        break;
    
      default:
        break;
    }
  };

  // add data to the search engine
  if (!dataType.hasOwnProperty(initDataType)) {
    initDataType = dataType.local;
  }

  add(data, initDataType);

  return {
    add,
    query,
    sink,
    prefetch,
    remove,
    reset,
    replaceOptions,
    setOption,
    update,
  };
};

