const defaultGroupName = 'default';

const getItemLabel = (item) => {
  let src = typeof item === 'object' ? item['label'] : item;

  if (typeof src !== 'string') {
    src = src.toString();
  }

  return src
};

const getDisplay = (item, display, type) => {
  let label = getItemLabel(item);

  if (display) {
    label = display(label, item, type);
  }

  return label;
};

const getGroupKey = (item) => {
  let groupKey =
    typeof item === 'object' ? item['group'] : defaultGroupName;

  if (typeof groupKey !== 'string' && typeof groupKey !== 'number') {
    groupKey = defaultGroupName;
  }

  groupKey = (groupKey.toString() || defaultGroupName);
  return groupKey.toUpperCase();
};

module.exports = {
  getDisplay,
  getGroupKey,
  getItemLabel,
};