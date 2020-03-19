const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'iastate-react-ahead',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      // note that all rules/loaders are loaded in reverse order by webpack, hence special parser or parsing cases
      // must come at the end of the rules chain, and exclusion shall be applied to rules/loaders that shall be skipped
      // or overridden with.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['source-map-loader', 'babel-loader'],
        enforce: 'pre'
      },
      {
        test: /\.css$/i,
        exclude: /(node_modules|JS\.css$)/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /GLOBAL\.css$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  },
  plugins: [],
  optimization: {
    // turn off minification since the final application product will minimize all dependencies
    minimize: false
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
};
