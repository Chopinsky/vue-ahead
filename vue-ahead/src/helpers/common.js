const hasProperty = (tgt, name) => {
	return Object.prototype.hasOwnProperty.call(tgt, name);
};

const randomSuffix = () => {
	return Math.random().toString(36).substring(2, 6);
};

module.exports = {
	hasProperty,
	randomSuffix,
};