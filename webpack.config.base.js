const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const NODE_ENV = process.env.NODE_ENV;

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',

  entry: {
    main: [
      'babel-polyfill',
      'client/index.jsx'
    ]
  },

  output: {
    path: path.join(process.cwd(), '/dist'),
    pathInfo: true,
    publicPath: '',
    filename: '[name].js'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ],

  module: {
    loaders: [
      { test: /\.s?css$/, loader: 'style?root=.!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      }
    ],

    noParse: /\.min\.js/
  }
};
