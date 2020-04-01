const getItemLabel = item => {
  return typeof item === 'object' ? item['source'] : item.toString();
};

module.exports = {
  getItemLabel,
};