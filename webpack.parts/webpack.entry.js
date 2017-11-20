const path = require('path');

const projectRoot = path.resolve(__dirname, '../');
const clientEntryFile = `${projectRoot}/src/client.jsx`;

module.exports = ({ isDebug }) => {
  if (!isDebug) {
    return clientEntryFile;
  }
  return [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    clientEntryFile,
  ];
};
