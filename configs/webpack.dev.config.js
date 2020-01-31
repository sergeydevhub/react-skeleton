const merge = require('webpack-merge');
const paths = require('./paths');
const webpack = require('webpack');
const devServer = require('./dev-server');
const DotEnvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');


module.exports = config => {

  return merge(config, {
    mode: process.env.NODE_ENV,
    cache: true,
    context: paths.root,
    //devtool: 'inline-source-map',
    devtool: 'eval',
    entry: [
      paths.entry
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      pathinfo: false
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [paths.src],
          exclude: [/node_modules/],
          use: {
            loader: 'ts-loader',
            options: {
              configFile: paths.tsDevConfig
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
       // multiStep: true, // better performance with many files
      }),
      new HtmlWebpackPlugin({
        template: paths.indexTemplate,
      }),
      new DotEnvPlugin({
        path: paths.dotEnvDev
      })
    ],

    devServer
  });
};
