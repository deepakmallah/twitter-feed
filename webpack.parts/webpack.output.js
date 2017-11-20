const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

module.exports = ({ isDebug }) => {
  const prodFileName = '[name].[chunkhash].js';
  const devFileName = 'client.js';
  return { filename: isDebug ? devFileName : prodFileName, path: `${projectRoot}/dist`, publicPath: '/' };
};
