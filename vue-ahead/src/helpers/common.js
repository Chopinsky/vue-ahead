const buildItem = (item, idx, keys, grouped) => {
	const controlItem = { src: item, };

	if (!hasProperty(item, 'key')) {
		item['key'] = idx.toString() + "#" + randomSuffix();
	}

	let key = item['key'];
	if (typeof key !== 'string') {
		key = (key === null || key === undefined)
			? randomSuffix()
			: key.toString();
	}

	let finalKey = key;
	while (hasProperty(keys, finalKey)) {
		finalKey = key + randomSuffix();
	}

	controlItem['key'] = finalKey;

	let label = item['label'];
	if (typeof label !== 'string') {
		label = (label === null || label === undefined)
			? ''
			: label.toString();
	}

	controlItem['label'] = label;

	if (grouped) {
		let groupKey = item['group'];
		if (typeof groupKey !== 'string') {
			groupKey = (groupKey === null || groupKey === undefined)
				? "default"
				: groupKey.toString();
		}

		controlItem['group'] = groupKey;
	}

	return controlItem;
};

const hasProperty = (tgt, name) => {
	return Object.prototype.hasOwnProperty.call(tgt, name);
};

const randomSuffix = () => {
	return Math.random().toString(36).substring(2, 8);
};

module.exports = {
	buildItem,
	hasProperty,
	randomSuffix,
};