const trie = function () {
  const _root = {
    children: {}
  };

  const insert = (token, src) => {
    if (typeof token !== 'string' || !token) {
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

  const find = (token) => {
    let keywords = null;

    if (typeof token !== 'string' || !token) {
      return keywords;
    }

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

const indexEngine = function (option) {
  let _trie = trie();
  let _rIndex = {};
  let _store = { index: 0 };

  const _option = option || {};

  const add = phrase => {
    if (!phrase || _store.hasOwnProperty(phrase)) {
      return;
    }
    
    const token = _option.token || ' ';
    const tokens = phrase.split(token);
    
    const key = _store.index++;
    _store[key] = phrase;

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }

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
        return a - b;
      });
    }
  };

  const getWords = target => {
    const token = _option.token || ' ';
    const tokens = target.split(token).filter(token => token);

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

    return { words: items, tokens };
  };

  const getDocs = target => {
    const { words, tokens } = getWords(target);
    if (!words || !words.length) {
      return null;
    }

    let matched = {};
    let init = true;

    for (let i = 0; i < words.length; i++) {
      const wordsBag = Object.keys(words[i]);

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

          // if the doc is not in the last bag
          if (!matched.hasOwnProperty(doc)) {
            if (init || _option.allowMissedMatch) {
              // create new entry if: 1) we're in the init process, or 2) we allow skipping missing terms
              next[doc] = { pos: index, match: 1 };
              hasMatches = true;
            }

            continue;
          }

          // the doc is in the last bag, check if we can get better deal
          if (next.hasOwnProperty(doc)) {
            if (next[doc].pos > index) {
              next[doc].pos = index;
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
    
    return { docs: matched, tokens };
  }

  const find = target => {
    const { docs, tokens } = getDocs(target) || { docs: {}};
    const docsArr = Object.keys(docs);

    if (!Array.isArray(docsArr) || !docsArr.length) {
      return null;
    }

    return {
      matches: docsArr.map(docIdx => {
        let source = _store[docIdx];
        return {
          source,
          matchCount: docs[docIdx].match,
        }
      }),
      tokens,
    }
  }

  const reset = () => {
    _trie = trie();
    _store = {};
    _rIndex = {};
  };

  return {
    add,
    reset,
    find,
  }
}

exports.indexEngine = indexEngine;
