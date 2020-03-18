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
      shelves: {},
      dict: {},
    };
  };

  const add = (phrase, extraData, scopeToken) => {
    phrase = phrase.trim();
    if (!phrase) {
      return;
    }

    if (_store.dict.hasOwnProperty(phrase)) {
      return;
    }

    let token = scopeToken || _options.token || " ";
    if (_options.tokenType === 'regex' && typeof token !== 'object') {
      // converting the token to regex for split
      token = new RegExp(token);
    }

    const tokens = phrase
      .split(token)
      .filter(val => val)
      .map(val => val.trim().toLowerCase());

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }

    _cache.clear();

    const docID = _store.index++;
    _store.shelves[docID] = { source: phrase, extraData };
    _store.dict[phrase] = docID;

    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i];
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

      _rIndex[word].sort(function(a, b) {
        return a.index - b.index;
      });
    }
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
  const find = target => {
    if (!target || typeof target !== 'string') {
      return {
        matches: null,
        tokens: null,
      };
    }

    const tokens = target
      .split(_options.token || ' ')
      .filter(token => token)
      .map(token => token.trim().toLowerCase());

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
      const { source, extraData } = _store.shelves[docID];

      return {
        key: docID,
        label: (extraData && extraData['label']) || '',
        source,
        extra: extraData ? extraData : null,
      }
    });

    return output;
  }

  const replaceOptions = (options) => {
    _options = options;
    _cache.clear();
  };

  const setOption = (name, value) => {
    _options[name] = value;

    if (name === 'allowPartialMatching') {
      _cache.clear();
    }
  }

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
    setOption,
    _debug,
  }
}
