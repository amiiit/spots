const webpack = require('webpack');
const config = require('./webpack.config.base.js');
Object.assign(config, {
  bail: true,
  debug: false,
  profile: false,
  devtool: 'cheap-module-source-map',
  devServer: { inline: true },
  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ])
})

config.module.loaders = config.module.loaders.map(loader => {
  if (loader.test.toString() === '/\\.jsx?$/') {
    loader.loaders.unshift('react-hot')
  }
  return loader
})
config.entry.main = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client'
].concat(config.entry.main)


module.exports = config;
