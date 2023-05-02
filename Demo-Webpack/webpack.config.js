const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  context: __dirname,
  entry: path.resolve('src', 'main.js'),
  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  target: 'web',
  profile: true,
  cache: true,
  performance: {
    hints: 'warning',
    maxAssetSize: 1024 * 256,
    maxEntrypointSize: 1024 * 512,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin({
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      extractComments: process.env.NODE_ENV !== 'development',
    })],
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    https: true,
    clientLogLevel: 'info',
    compress: true,
    open: true,
  },
  stats: true,
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    symlinks: true,
    mainFields: ['jsnext:main', 'browser', 'module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'node_modules')],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    enforceModuleExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.[cm]?js$/i,
        use: ['thread-loader', 'babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.[cm]?ts$/i,
        use: ['thread-loader', 'ts-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.styl$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'stylus-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })].concat(process.env.NODE_ENV === 'development' ? [] : [new MiniCssExtractPlugin({
    filename: '',
    chunkFilename: '',
  })]),
}
