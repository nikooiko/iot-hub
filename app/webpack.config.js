const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  }
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production')
  //     }
  //   })
  //   // TODO uncommenct for production
  //   // new webpack.optimize.UglifyJsPlugin({
  //   //   compress: {
  //   //     warnings: true
  //   //   }
  //   // })
  // ]
};

module.exports = config;
