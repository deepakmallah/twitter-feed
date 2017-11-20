module.exports = ({ isDebug }) => {
  if (!isDebug) return {};
  return {
    // enable HMR on the server
    hot: true,
    historyApiFallback: true,
  };
};
