const commonConfig = require('./webpack.common.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

module.exports = (function(env) {
  return env.match('dev') ? devConfig(commonConfig) : prodConfig(commonConfig);
})(process.env.NODE_ENV);
