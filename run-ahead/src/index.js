const axios = require('axios').default;
const { indexEngine } = require('./search');

exports.runahead = function (options, data) {
  if (data && !Array.isArray(data)) {
    throw new Error('the source data provided to the search engine must be an array, but got:', typeof data);
  }

  if (!data && (!options || !options.remote)) {
    throw new Error('you must provide either source data or the remote connection settings to use the engine');
  }

  let _engine = indexEngine({
    token: options.token,
  });
  
  let _createdItems = [];
  let _options = options;

  const add = dataToAdd => {
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
        _engine.add(item['source'], { 
          label: item['label'] || '', 
          ...item['extraData'], 
        });
      });

      return;
    }
    
    // if a sole object, only add this single entry
    _engine.add(dataToAdd["source"], {
      label: dataToAdd["label"] || '',
      ...dataToAdd["extraData"]
    });
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
   *        { key: <required|string>, label: <optional|string>, source: <required|string>, extraData: <optional|object> }, 
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

    if (typeof remoteCallback === "function" && _options.remote) {
      //todo: 
      // 1. use callback to add query results, then search again
      // 2. call callbacks on the query data
      const { remote, queryBuilder, dataParser, transport } = _options; 

      let params = {
        ...remote.params,
        q: target
      };

      if (typeof queryBuilder === 'function') {
        params = queryBuilder(params);
      }

      let req = {
        ...remote,
        params,
      }

      const provider = (transport && typeof transport.then === 'function') || axios;

      provider(req)
        .then(resp => {
          // format data if a formatter is passed
          let data =
            typeof dataParser === "function" ? dataParser(resp.data) : resp.data;

          // now add newly obtained data to the index search engine
          add(data);

          remoteCallback(_engine.find(target), data);
        })
        .catch(err => {
          console.error('[error]', err);
        });
    }

    // returned data format:
    // {
    //    matches: [
    //      { key: <required|string>, label: <optional|string>, source: <required|string>, extraData: <optional|object> }, 
    //        ...
    //      ],
    //    tokens: [
    //      token1: <string>, 
    //      token2: <string>, 
    //      ...
    //    ],
    // }
    return _engine.find(target);
  };

  const reset = () => {
    let created = _createdItems;
    
    _createdItems = [];
    _engine.reset();

    return created;
  };

  const replaceOptions = options => {
    _options = options;
  };

  const setOption = (name, value) => {
    _options[name] = value;
  };

  // add data to the search engine
  add(data);

  return {
    add,
    query,
    reset,
    replaceOptions,
    setOption,
  };
};

