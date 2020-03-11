const trie = function () {
  this._root = {
    children: {}
  };

  this._roots = {
    // char: [node]
  };

  const insert = (key, value) => {

  };

  const find = (key) => {

  };

  return {
    insert,
    find,
  };
};

const searchEngine = function (option) {
  this._trie = trie();
  this._store = {};
  this._option = option || {};

  const add = (data) => {
    let { key, value } = data;

    if (!key) {
      return;
    }

    if (!value) {
      value = key;
    }

    const token = this._option.token || ' ';
    const tokens = key.split(token);

    if (!Array.isArray(tokens) || !tokens.length) {
      return;
    }


  };

  const reset = () => {
    this._trie = trie();
    this._store = {};
  };

  const find = (tgt) => {

  };

  return {
    add,
    reset,
    find,
  }
}

exports.searchEngine = searchEngine;
