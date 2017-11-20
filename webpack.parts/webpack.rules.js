/* eslint-disable import/no-extraneous-dependencies */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonRules = [
  { test: /\.(jpe?g|png|gif|svg)$/i, use: [ { loader: 'file-loader' } ] },
  { test: /\.jsx?$/, loader: 'babel-loader' },
];

const getCssRules = (isDebug) => {
  const test = /\.css$/;
  const nodeModules = /node_modules/;

  // loads global css
  const globLCssLoader = [ 'css-loader?importLoaders=1', 'postcss-loader' ];

  // loads local css and scopes it just to the component using it (CSS Modules)
  const localCssLoader = [ 'css-loader?importLoaders=1&modules', 'postcss-loader' ];

  if (isDebug) {
    return [
      { test, include: nodeModules, loaders: [ 'style-loader', ...globLCssLoader ] },
      { test, exclude: nodeModules, loaders: [ 'style-loader', ...localCssLoader ] },
    ];
  }
  return [
    { test, include: nodeModules, loader: ExtractTextPlugin.extract(globLCssLoader) },
    { test, exclude: nodeModules, loader: ExtractTextPlugin.extract(localCssLoader) },
  ];
};

module.exports = ({ isDebug }) => {
  if (isDebug) {
    return [ ...commonRules, ...getCssRules(isDebug) ];
  }
  return [ ...commonRules, ...getCssRules(isDebug) ];
};
