var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname, '..', '/'),
  entry: {
    // Add each page's entry here
    guguFirebaseConnector: './src/index',
  },
  output: {
    path: path.join(__dirname, '..', '/dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')), // judge if dev environment.
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')) // judge if secret environment.
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
    noParse: []
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {}
  },
  devServer: {
    port: 8088,
    // proxy: {
    //   '/api/v1/*': {
    //     target: 'http://123.59.79.196',
    //     secure: false
    //   }
    // }
  },
  externals: {
    jquery: "$",
  }
};

module.exports = config;