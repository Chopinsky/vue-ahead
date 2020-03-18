/**
 * This is the main `babel` configuration file. It's used
 *
 */

module.exports = function (api) {
    api.cache(true);
  
    const plugins = [
      '@babel/plugin-transform-modules-commonjs'
    ];
  
    const presets = [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            node: 'current',
          },
        },
      ],
    ];
  
    return {
      presets,
      plugins,
    };
  };
  