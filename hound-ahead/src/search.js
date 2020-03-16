const { cache } = require('./cache');

const trie = function () {
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

exports.indexEngine = option => {
  let _option = option || {};
  let _trie, _rIndex, _store, _cache;
  
  const reset = () => {
    _trie = trie();
    _cache = cache();

    _rIndex = {};
    _store = { 
      index: 0,
      shelves: {},
      dict: {},
    };
  };

  const add = (phrase, scopeToken) => {
    if (!phrase) {
      return;
    }

    phrase = phrase.trim();
    if (_store.dict.hasOwnProperty(phrase)) {
      return;
    }
    
    const token = scopeToken || _option.token || ' ';
    const tokens = phrase
      .split(token)
      .filter(val => val)
      .map(val => val.toLowerCase());

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }

    _cache.clear();
    
    const key = _store.index++;
    _store.shelves[key] = phrase;
    _store.dict[phrase] = key;

    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i];
      if (!word || !word.length) {
        continue;
      }
      
      for (let j = word.length - 1; j >= 0; j--) {
        _trie.insert(word.substring(j), word);
      }

      if (_rIndex.hasOwnProperty(word)) {
        _rIndex[word].push({ doc: key, index: i });
      } else {
        _rIndex[word] = [{ doc: key, index: i }];
      }

      _rIndex[word].sort(function(a, b) {
        return a.index - b.index;
      });
    }
  };

  /** Below are obsolete code but serve as baseline for a functional token search algo 
   *  =================================================================================
  const findKeywords = tokens => {
    if (!Array.isArray(tokens) || !tokens.length) {
      return null;
    }

    let items = [];

    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i]) {
        continue;
      }

      let { found, matches } = _trie.find(tokens[i]) || {};
      
      if (!found) {
        if (!_option.allowMissedMatch) {
          return null;
        }

        items.push({});
        continue
      }

      items.push(matches);
    }

    return items;
  };

  const findDocs = tokens => {
    const keywords = findKeywords(tokens);
    if (!keywords || !keywords.length) {
      return null;
    }

    let matched = {};
    let init = true;

    for (let i = 0; i < keywords.length; i++) {
      const wordsBag = Object.keys(keywords[i]);

      if (!wordsBag || !wordsBag.length) {
        if (!_option.allowMissedMatch) {
          return null;
        }

        continue;
      }

      let next = {};
      let hasMatches = false;

      for (let j = 0; j < wordsBag.length; j++) {
        const docs = _rIndex[wordsBag[j]];

        if (!docs || !docs.length) {
          continue;
        }

        for (let k = 0; k < docs.length; k++) {
          const { doc, index } = docs[k];

          // the doc is in the current bag, check if we can improve it
          // this also implies that regardless of the last doc status, the current doc is legit to be updated
          // hence this logic block must come before the validation check block below
          if (next.hasOwnProperty(doc)) {
            if (next[doc].pos > index) {
              next[doc].pos = index;
            }

            continue;
          }

          // if the doc is not in the last bag, the doc is likely to be dropped from further consideration,
          // however we must consider if this is a initial run (i.e. no previous matches), or if we allow the 
          // doc to miss the term in its source
          if (!matched.hasOwnProperty(doc)) {
            if (init || _option.allowMissedMatch) {
              // create new entry if: 1) we're in the init process, or 2) we allow skipping missing terms
              next[doc] = { pos: index, match: 1 };
              hasMatches = true;
            }

            continue;
          }

          // update the doc matches and the position
          if (matched[doc].pos < index) {
            next[doc] = { pos: index, match: matched[doc].match + 1 };
            hasMatches = true;
          }
        }
      }

      // if allowing doc to miss matching for this term, add all the docs.  
      if (_option.allowMissedMatch) {
        next = Object.assign(matched, next);
        if (!hasMatches) {
          hasMatches = (Object.keys(next) || []).length > 0;
        }
      }

      if (!hasMatches && !_option.allowMissedMatch) {
        return null;
      }
      
      init = false;
      matched = next;
    }
    
    return matched;
  }
  */

  const findDocs = tokens => {
    if (!Array.isArray(tokens) || !tokens.length) {
      return null;
    }

    let curr = null;

    for (let i = 0; i < tokens.length; i++) {
      //TODO: add caching calls here ....

      let { found, matches } = _trie.find(tokens[i]) || {};
      
      if (!found && !_option.allowMissedMatch) {
        return null;
      }

      let keywords = Object.keys(matches);
      if ((!keywords || !keywords.length) && !_option.allowMissedMatch) {
        return null;
      }
      
      // get all docs from this token
      let next = {};
      let matched = false;

      for (let j = 0; j < keywords.length; j++) {
        const docList = _rIndex[keywords[j]];
        if (!docList || !docList.length) {
          continue;
        }
        
        for (let k = 0; k < docList.length; k++) {
          const { doc, index } = docList[k];

          // if 1) this is the 1st token, 
          // or 2) last token has the doc, and it's index is before the current doc index,
          // or 3) we allow last term to be missed,
          // then we say the doc is valid to be added.
          const isValid = !curr || (curr.hasOwnProperty(doc) && curr[doc] < index) || _option.allowMissedMatch;
          
          if (isValid && (!next.hasOwnProperty(doc) || next[doc] > index)) {
            next[doc] = index;
            matched = true;
          }
        }
      }

      if (!matched && !_option.allowMissedMatch) {
        return null;
      }

      // try merge and verify the token with the docs from the last term
      if (curr && _option.allowMissedMatch) {
        // override current with the valid docs, docs from last searches that won't match this token will be kept
        next = Object.assign(curr, next);
      }

      curr = next;
    }

    return curr;
  }

  const find = target => {
    if (!target) {
      return {
        matches: null,
        tokens: null,
      };
    }

    target = target.toLowerCase().trim();
    const tokens = target.split(_option.token || ' ').filter(token => token);

    const docs = findDocs(tokens) || {};
    const docsArr = Object.keys(docs);

    const output = {
      matches: null,
      tokens,
    }

    if (!Array.isArray(docsArr) || !docsArr.length) {
      return output;
    }

    output.matches = docsArr.map(docIdx => {
      return {
        key: docIdx,
        source: _store.shelves[docIdx],
        matchCount: docs[docIdx].match,
      }
    })

    return output;
  }

  const replaceOptions = (options) => {
    _option = options;
  };

  const setOption = (name, value) => {
    _option[name] = value;
  }

  const _debug = () => {
    Object.keys(_rIndex)
      .forEach(key => console.log(key));
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
