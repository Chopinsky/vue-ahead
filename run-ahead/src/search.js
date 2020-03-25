const { cache } = require('./cache');

const delimiter = String.fromCharCode(1);
const defaultCacheHit = { docs: null, start: 0 };

const trie = () => {
  const _root = {
    children: {},
    dict: {},
  };

  const insert = (token, src) => {
    if (typeof token !== 'string' || !token) {
      return;
    }

    token = token.trim().toLowerCase();
    if (_root.dict.hasOwnProperty(token)) {
      return;
    }

    let node = _root;
    for (let i = 0; i < token.length; i++) {
      let c = token[i];

      if (!node.children.hasOwnProperty(c)) {
        node.children[c] = {
          keywords: {},
          children: {}
        };
      }

      node = node.children[c];

      if (!node.keywords.hasOwnProperty(src)) {
        node.keywords[src] = 0
      }
    }
  };

  const find = token => {
    if (typeof token !== 'string' || !token) {
      return null;
    }

    token = token.trim().toLowerCase();
    let node = _root;

    for (let i = 0; i < token.length; i++) {
      let c = token[i];

      if (!node.children.hasOwnProperty(c)) {
        return {
          found: false,
          keyword: token.substring(0, i),
          matches: node.keywords,
        }
      }

      node = node.children[c];
    };

    return {
      found: true,
      keyword: token,
      matches: node.keywords,
    }
  };

  return {
    insert: insert,
    find: find,
  };
};

exports.indexEngine = options => {
  let _options = options || {};
  let _trie, _rIndex, _store, _cache;

  if (_options.tokenType === "regex" && typeof _options.token !== "object") {
    // convert the token to regex for split
    _options.token = new RegExp(_options.token);
  }
  
  const reset = () => {
    _trie = trie();

    _cache = cache({
      capacity: _options.cacheCapacity || 16,
      hitOnPrefix: true,
    });

    _rIndex = {};
    
    _store = { 
      index: 0,
      shelf: {},
      dict: {},
    };
  };

  const tokenize = (phrase, scopeToken) => {
    let delimiter = scopeToken || _options.token || " ";
    if (_options.tokenType === "regex" && typeof delimiter !== "object") {
      // converting the token to regex for split
      delimiter = new RegExp(delimiter);
    }

    return phrase
      .split(delimiter)
      .filter(val => val)
      .map(val => val.trim().toLowerCase());
  }

  const add = (phrase, extraData, scopeToken) => {
    phrase = phrase.trim();
    if (!phrase) {
      return;
    }

    if (_store.dict.hasOwnProperty(phrase)) {
      return;
    }

    const tokens = tokenize(phrase, scopeToken);
    if (!Array.isArray(tokens) || !tokens.length) {
      return null;
    }

    _cache.clear();

    const docID = _store.index++;
    const data = {
      source: phrase,
      extraData,
      token: scopeToken,
    };

    _store.dict[phrase] = docID;
    _store.shelf[docID] = data;

    for (let i = 0; i < tokens.length; i++) {
      const word = tokens[i];
      if (!word || !word.length) {
        continue;
      }

      for (let j = word.length - 1; j >= 0; j--) {
        _trie.insert(word.substring(j), word);
      }

      if (_rIndex.hasOwnProperty(word)) {
        _rIndex[word].push({ docID, position: i });
      } else {
        _rIndex[word] = [{ docID, position: i }];
      }
    }

    return { key: docID, data };
  };

  const findDocs = tokens => {
    if (!Array.isArray(tokens) || !tokens.length) {
      return null;
    }

    let matchedTokens = [];

    let cacheKey =
      tokens.length > 1 ? tokens.slice(0, -1).join(delimiter) : tokens[0];

    let { docs, start } = _cache.hit(cacheKey) || defaultCacheHit;
    
    // if we can locate a prefix previously being searched, use it as the start point
    if (docs && start >= tokens.length) {
      return docs;
    }

    for (let i = start; i < tokens.length; i++) {
      let token = tokens[i];
      let { found, keyword, matches } = _trie.find(token) || {};

      // if not found, we will have at most partial matching, and we shall return null 
      // if this type of matching is not allowed
      if (!found && !_options.allowPartialMatching) {
        return null;
      }

      let keywords = Object.keys(matches);
      if (!keywords || !keywords.length) {
        return null;
      }

      // get all docs from this token
      token = keyword;
      let next = {};
      let hasDoc = false;

      // transforming the keywords list into doc+position list
      for (let j = 0; j < keywords.length; j++) {
        const docList = _rIndex[keywords[j]];
        if (!docList || !docList.length) {
          continue;
        }

        for (let k = 0; k < docList.length; k++) {
          const { docID, position } = docList[k];
          const isValid = !docs || (docs.hasOwnProperty(docID) && docs[docID] < position);

          if (isValid && (!next.hasOwnProperty(docID) || next[docID] > position)) {
            next[docID] = position;
            hasDoc = true;
          }
        }
      }

      // we can't find any matching doc given the prefix so far ...
      if (!hasDoc) {
        return null;
      }

      // found a valid prefix to the search term, cache the result by far
      if (i === tokens.length - 1 && cacheKey) {
        if (i > start) {
          _cache.push(cacheKey, { docs, start: i, });          
        } else if (i === 0) {
          _cache.push(cacheKey, { docs: next, start: 1, });
        }
      }

      docs = next;
      matchedTokens.push(token);
    }

    return { 
      docs, 
      matchedTokens,
    };
  }

  /**
   * 
   * @param {string} target 
   * the string to search with 
   */
  const find = (target, scopeToken) => {
    if (!target || typeof target !== 'string') {
      return {
        matches: null,
        tokens: null,
      };
    }

    const tokens = tokenize(target, scopeToken);
    const { docs, matchedTokens } = findDocs(tokens) || {};

    const output = {
      matches: null,
      tokens: matchedTokens || tokens,
    };

    const docsArr = Object.keys(docs || {});
    if (!Array.isArray(docsArr) || !docsArr.length) {
      return output;
    }

    output.matches = docsArr.map(docID => {
      const { source, extraData } = _store.shelf[docID];

      return {
        key: docID,
        source,
        extra: extraData ? extraData : null,
      }
    });

    return output;
  };

  const remove = source => {
    if (!_store.dict.hasOwnProperty(source)) {
      return null;
    }

    const docID = _store.dict[source];
    const data = _store.shelf[docID];

    const { token } = data || {};
    const tokens = tokenize(source, token);

    if (Array.isArray(tokens) && tokens.length > 0) {
      for (let i = 0; i < tokens.length; i++) {
        const word = tokens[i];
        if (!word || !word.length) {
          continue;
        }

        if (_rIndex.hasOwnProperty(word) && Array.isArray(_rIndex[word])) {
          _rIndex[word] = 
            Array.prototype.filter.call(
              _rIndex[word],
              item => item.docID !== docID
            );
        }
      }
    }

    _cache.clear();

    delete _store.dict[source];
    delete _store.shelf[docID];

    let last = _store.index;
    while (!_store.shelf.hasOwnProperty(last - 1)) {
      // find the last index that's still occupied
      last--;
    }

    if (_store.index !== last) {
      _store.index = last;
    }

    return {
      key: docID,
      data,
    }
  };

  const update = (source, data) => {
    if (!_store.dict.hasOwnProperty(source)) {
      add(source, data);
      return null;
    }

    let docID = _store.dict[source];
    let oldData;

    if (_store.shelf.hasOwnProperty(docID)) {
      oldData = _store.shelf[docID]['extraData'];
      _store.shelf[docID]['extraData'] = data;
    }

    return oldData;
  };

  const replaceOptions = (options) => {
    _options = options;
    _cache.clear();
  };

  const setOption = (name, value) => {
    _options[name] = value;

    if (name === 'allowPartialMatching') {
      _cache.clear();
    }
  };

  const _debug = () => {
    Object.keys(_rIndex)
      .forEach(key => console.info(key));
  };

  // must initialize the `this` context before returning.
  reset();

  return {
    add,
    reset,
    find,
    replaceOptions,
    remove,
    setOption,
    update,
    _debug,
  }
};
