const merge = require('webpack-merge');
const paths = require('./paths');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');

module.exports = config => {
  return merge(config, {
    mode: process.env.NODE_ENV,
    devtool: 'source-map',

    output: {
      path: paths.dist,
      filename: '[name].[hash].js'
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
              configFile: paths.tsProdConfig
            }
          }
        }
      ]
    },
    plugins: [
     new DotEnvPlugin({
       path: paths.dotEnvProd
     }),

     new HTMLWebpackPlugin({
       template: paths.indexTemplate,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
     })
    ],
  })
};
