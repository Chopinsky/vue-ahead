const axios = require('axios').default;
const idxEngine = require('./search').indexEngine;

exports.AheadEngine = function (options, data) {
  if (data && !Array.isArray(data)) {
    throw new Error('the source data provided to the search engine must be an array, but got:', typeof data);
  }

  let _engine = idxEngine();

  let _options = options || {};
  let _subscribers = [];
  let _createdItems = [];

  const subscribe = subscriber => {
    if (typeof subscriber === 'function') {
      _subscribers.push(subscriber);      
    }
  };

  const createEntry = item => {
    _engine.add(item);
    _createdItems.push(item);
  };

  const getCreatedItems = () => {
    return _createdItems;
  };

  return {
    subscribe,
    createEntry,
    getCreatedItems,
  };
};

