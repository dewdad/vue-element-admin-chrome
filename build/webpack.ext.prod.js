const webpack = require('webpack')
const merge = require('webpack-merge')
const debug = require('util')
const path = require('path')

const ZipPlugin = require('zip-webpack-plugin')
const ZipFolder = require('zip-folder')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')

const baseWebpack = require('./webpack.ext.base')
const { styleLoaders, increaseVersion } = require('./tools')

module.exports = merge(baseWebpack, {
  // watch: false,
  module: { rules: styleLoaders({ extract: true, sourceMap: true }) },
  // devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    /*
    new WebpackCdnPlugin({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          style: 'dist/vue.css'
        },
        {
          name: 'vue-router'
        }
      ],
      publicPath: path.join(__dirname, '../node_modules')
    }),
    */
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ZipPlugin({
      path: path.resolve(__dirname, '..', 'shared', 'tarball', 'extension', 'chrome'),
      filename: 'extension.prod.zip'
    })

  ]
})

/*
// chain custom plugins based on env vrariables
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        options: 'options',
        popup: 'popup',
        contentScripts: 'contentScripts/index',
      },
    }),
  ])
}
*/