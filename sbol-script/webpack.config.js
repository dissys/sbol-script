const path = require('path');
const webpack = require('webpack');
const { version } = require('./package.json');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/
      }
    ]
  },
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    filename: 'sbol-script.js',
    path: path.resolve(__dirname, 'dist'),
    library: { name: 'sbolScript', type: 'umd' },
    globalObject: 'this'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version)
    })
  ]
};
