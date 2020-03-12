const trie = function () {
  this._root = {
    children: {}
  };

  const insert = (token, src) => {
    if (typeof token !== 'string' || !token) {
      return;
    }

    let node = this._root;

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

    let node = this._root;

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
  this._trie = trie();
  this._rIndex = {};
  this._store = { index: 0 };

  this._option = option || {};

  const add = phrase => {
    if (!phrase || this._store.hasOwnProperty(phrase)) {
      return;
    }

    
    const token = this._option.token || ' ';
    const tokens = phrase.split(token);
    
    const key = this._store.index++;
    this._store[key] = phrase;

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }

    for (let i = 0; i < tokens.length; i++) {
      let word = tokens[i];
      
      for (let j = word.length - 1; j >= 0; j--) {
        this._trie.insert(word.substring(j), word);
      }

      if (this._rIndex.hasOwnProperty(word)) {
        this._rIndex[word].push({ doc: key, index: i });
      } else {
        this._rIndex[word] = [{ doc: key, index: i }];
      }

      this._rIndex[word].sort(function(a, b) {
        return a - b;
      });
    }
  };

  const getWords = target => {
    const token = this._option.token || ' ';
    const tokens = target.split(token);

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }

    let items = [];

    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i]) {
        continue;
      }

      let { found, matches } = this._trie.find(tokens[i]) || {};
      
      if (!found) {
        if (!this._option.allowSkipMatch) {
          return null;
        }

        items.push({});
        continue
      }

      items.push(matches);
    }

    return items;
  };

  const find = target => {
    const words = getWords(target);
    if (!words || !words.length) {
      return null;
    }

    let keys = {};

    for (let i = 0; i < words.length; i++) {
      let th = i > 0 ? {...keys} : null;

      if (!bag || !bag.length) {
        if (!this._option.allowSkipMatch) {
          return null;
        }

        continue;
      }

      Object
        .keys(bag)
        .forEach(word => {
          let { doc, index } = this._rIndex[word] || {};

          if (i == 0) {
            if (!keys.hasOwnProperty(doc) || keys[doc] >= index) {
              key[doc] = index;
            }
          } else {
            if (!keys.hasOwnProperty(doc)) {
              if (this._option.allowSkipMatch)
            }
          }
        });
      
      keys = key;
    }
      
  }

  const reset = () => {
    this._trie = trie();
    this._store = {};
  };

  return {
    add,
    reset,
    find,
  }
}

exports.indexEngine = indexEngine;
