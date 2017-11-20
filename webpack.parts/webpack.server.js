/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./webpack.rules');

const rootPath = path.resolve(__dirname, '../');

module.exports = ({ isDebug }) => ({
  entry: `${rootPath}/src/server.jsx`,
  output: { filename: 'server.js', path: `${rootPath}/dist`, publicPath: '/' },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    alias: { config: `${rootPath}/src/config/prod.js` },
  },
  module: { rules: rules({ isDebug }) },
  target: 'node',
  externals: fs.readdirSync('node_modules').reduce((acc, mod) => {
    if (mod === '.bin') {
      return acc;
    }
    // eslint-disable-next-line no-param-reassign
    acc[mod] = `commonjs ${mod}`;
    return acc;
  }, {}),
  plugins: [ new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }) ],
});
