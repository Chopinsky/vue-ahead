/**
 * This is the main `babel` configuration file. It's used
 *
 */

module.exports = function (api) {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-class-properties'
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/react'
  ];

  return {
    presets,
    plugins
  };
};
