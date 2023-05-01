const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
  devtool: 'source-map',
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
    aggregateTimeout: 500,
    poll: 1000,
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    },
    symlinks: true,
    mainFields: ['jsnext:main', 'browser', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules:['node_modules'],
    descriptionFiles: ['package.json'],
    enforceExtension: false,
    enforceModuleExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.[cm]?js$/i,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
      },
      {
        test: /\.[cm]?ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [].concat(process.env.NODE_ENV === 'development' ? [] : [new MiniCssExtractPlugin()]),
}
