const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const production = process.env.NODE_ENV === 'production';

const dependencies = [
  'babel-polyfill/dist/polyfill.min.js',
  'angular-resource/angular-resource.min.js',
  'angular-animate/angular-animate.min.js',
  'angular-messages/angular-messages.min.js',
  'angular-sanitize/angular-sanitize.min.js',
  'angular-aria/angular-aria.min.js',
  'socket.io-client/dist/socket.io.min.js',
  'angular-socket-io/socket.min.js',
  'tinycolor2/dist/tinycolor-min.js',
  'moment/moment.js',
  'angular-marked/dist/angular-marked.js',
  'marked/marked.min.js',
  'chart.js/dist/Chart.bundle.min.js',
  'hammerjs/hammer.min.js',
  'chartjs-plugin-zoom/chartjs-plugin-zoom.min.js',
  'angular-md5/angular-md5.min.js',
  'angular-jwt/dist/angular-jwt.min.js',
  'paper/dist/paper-core.min.js'
];

const config = {
  context: path.join(__dirname, '/client'),
  entry: {
    'public/app': './public/app/app.js',
    'public/vendor': [
      'babel-polyfill',
      'angular',
      'angular-resource',
      'angular-animate',
      'angular-messages',
      'angular-aria',
      'angular-sanitize',
      'angular-material',
      'angular-ui-router'
    ],
    'appUser/app': './appUser/app/app.js',
    'appUser/vendor': [
      'babel-polyfill',
      'angular',
      'angular-resource',
      'angular-animate',
      'angular-messages',
      'angular-aria',
      'angular-sanitize',
      'angular-material',
      'angular-ui-router',
      'socket.io-client',
      'angular-socket-io',
      'tinycolor2',
      'md-color-picker',
      'moment',
      'mdPickers',
      'chart.js',
      'hammerjs',
      'chartjs-plugin-zoom',
      'angular-md5',
      'angular-material-data-table',
      'paper'
    ],
    'appAdmin/app': './appAdmin/app/app.js',
    'appAdmin/vendor': [
      'babel-polyfill',
      'angular',
      'angular-resource',
      'angular-animate',
      'angular-messages',
      'angular-aria',
      'angular-sanitize',
      'angular-material',
      'angular-ui-router',
      'angular-marked',
      'angular-material-data-table',
      'angular-socket-io'
    ],
    'appShared/app': './appShared/app/app.js',
    'appShared/vendor': [
      'babel-polyfill',
      'angular',
      'angular-resource',
      'angular-animate',
      'angular-messages',
      'angular-aria',
      'angular-sanitize',
      'angular-material',
      'angular-ui-router',
      'socket.io-client',
      'angular-socket-io',
      'chart.js',
      'hammerjs',
      'chartjs-plugin-zoom',
      'angular-md5',
      'angular-material-data-table',
      'angular-jwt'
    ]
  },
  resolve: {
    alias: {}
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    noParse: [],
    preLoaders: [
    ],
    loaders: [
      {
        test: /md-color-picker/,
        loader: 'imports?tinycolor=tinycolor2'
      },
      {
        test: /mdPickers/,
        loader: 'imports?moment=moment'
      },
      {
        test: /angular-marked/,
        loader: 'imports?marked=marked'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css!sass'
        )
      },
      { test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.pug$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css') // Run both loaders
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=/fonts/[name].[ext]'
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=/fonts/[name].[ext]'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2&name=/fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=/fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&name=/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=10000&mimetype=image/png&name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'public/vendor',
      chunks: ['public/vendor', 'public/app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'appUser/vendor',
      chunks: ['appUser/vendor', 'appUser/app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'appAdmin/vendor',
      chunks: ['appAdmin/vendor', 'appAdmin/app']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'appShared/vendor',
      chunks: ['appShared/vendor', 'appShared/app']
    }),
    new WebpackShellPlugin({
      onBuildStart: ['mkdir -p ./dist', 'npm run lbng']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      paper: 'paper'
    })
  ]
};

if (production) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      sourceMap: false
    })
  );
} else {
  config.devtool = 'source-map';
  dependencies.forEach((dep) => {
    config.resolve.alias[dep.split(path.sep)[0]] = dep;
    config.module.noParse.push(dep);
  });
}

module.exports = config;
