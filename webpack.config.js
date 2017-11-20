const path = require('path');

const env = process.env.NODE_ENV || 'development';
const isDebug = env === 'development';
const buildSSR = !!process.env.SSR;

const { rules, entry, output, devServer, plugins, server } = require('./webpack.parts');

const clientConfig = {
  entry: entry({ isDebug }),
  devtool: isDebug ? 'inline-source-map' : 'source-map',
  output: output({ isDebug }),
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    alias: { config: path.join(__dirname, 'src/config.js') },
  },
  module: { rules: rules({ isDebug }) },
  target: 'web',
  devServer: devServer({ isDebug }),
  plugins: plugins({ isDebug }),
};

const getConfig = () => {
  if (isDebug || !buildSSR) {
    return clientConfig;
  }
  return [ clientConfig, server({ isDebug }) ];
};

module.exports = getConfig();
