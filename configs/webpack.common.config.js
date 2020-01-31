const paths = require('./paths');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  cache: true,

  output: {
    publicPath: paths.public,
  },

  resolve: {
    alias: {
      '@core': paths.core,
      '@theme': paths.theme,
      '@app': paths.app,
    },
    extensions: paths.filesExtensions,
    modules: ['node_modules'],
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx?)$/,
        include: [paths.src],
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        include: [paths.src],
        use: {loader: 'json-loader'},
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ]
      },
    ],
  },

  plugins: [
    //new DashboardPlugin(),
    new ForkTsCheckerWebpackPlugin(),

    (new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
      cwd: paths.root
    }))
  ]
};
