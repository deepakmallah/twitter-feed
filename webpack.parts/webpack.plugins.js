/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const htmlGenerator = new HtmlWebpackPlugin({
  // html-webpack-template requires this to work
  inject: false,
  template: HtmlWebpackTemplate,
  appMountId: 'app',
  mobile: true,
  title: 'React Starter',
});
const injectVariables = new webpack.DefinePlugin({
  'process.env': { NODE_ENV: JSON.stringify(env), API_HOST: JSON.stringify(process.env.API_HOST) },
});

const debugConfig = [
  htmlGenerator,
  injectVariables,
  // enable HMR globally
  new webpack.HotModuleReplacementPlugin(),
  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
];

const prodConfig = [
  htmlGenerator,
  injectVariables,
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin({ filename: '[name].[chunkhash].css', disable: false, allChunks: true }),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    sourceMap: true,
    mangle: { screw_ie8: true },
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      join_vars: true,
      if_return: true,
      // Drop `console` statements
      drop_console: true,
    },
  }),
  // extracts, the used packages from node_modules/ to a separate bundle (vendor.js)
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ userRequest }) => userRequest && userRequest.indexOf('node_modules') >= 0,
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: cssnano,
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true,
  }),
];

module.exports = ({ isDebug }) => {
  if (isDebug) {
    return debugConfig;
  }
  return prodConfig;
};
