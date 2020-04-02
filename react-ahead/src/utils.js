const getItemLabel = item => {
  let src = typeof item === 'object' ? item['source'] : item;

  if (typeof src !== 'string') {
    src = src.toString();
  }

  return src
};

module.exports = {
  getItemLabel,
};