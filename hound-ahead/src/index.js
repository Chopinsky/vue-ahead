const axios = require('axios').default;
const { indexEngine } = require('./search');

exports.AheadEngine = function (options, data) {
  if (data && !Array.isArray(data)) {
    throw new Error('the source data provided to the search engine must be an array, but got:', typeof data);
  }

  let _engine = indexEngine();
  let _createdItems = [];
  let _options = options || {};

  const add = dataToAdd => {
    // only accepting objects
    if (typeof dataToAdd !== 'object') {
      return;
    }

    // if an array, recursively add all items
    if (Array.isArray(dataToAdd)) {
      if (!dataToAdd.length) {
        return;
      }

      dataToAdd.forEach(item => {
        _engine.add(item['display'], { label: item['label'], ...item['extra'], });
      });

      return;
    }
    
    // if a sole object, only add this single entry
    _engine.add(dataToAdd['display'], { label: dataToAdd['label'], ...dataToAdd['extra'], });
  };

  const query = (src) => {

  };

  const reset = () => {
    let created = _createdItems;
    
    _createdItems = [];
    _engine.reset();

    return created;
  };

  // add data to the search engine
  add(data);

  return {
    query,
    reset,
    add,
  };
};

