const paths = require('./paths');

module.exports = {
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: true,
  contentBase: paths.src,
  watchOptions: {
    poll: true
  },
  // proxy: {
  //   "/.*/": {
  //     target: {
  //       host: 'http://localhost:1338',
  //     }
  //   }
  // }
  stats: false,
};
