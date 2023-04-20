const path = require('path')
const NodePolyfill = require('@rspack/plugin-node-polyfill')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: './src/main.jsx',
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	builtins: {
		html: [
			{
				template: './index.html',
			},
		],
	},
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
	plugins: [
    NodePolyfill(),
    new BundleAnalyzerPlugin(),
  ],
	module: {
		rules: [
			{
				test: /\.svg|\.jpg|\.png|\.gif$/,
				use: [
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
				type: 'asset',
			},
			{
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {},
          },
        ],
        type: 'css',
      },
			{
        test: /\.sass$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
        type: 'css',
      },
			{
        test: /\.less$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {},
          },
          {
            loader: 'less-loader',
            options: {},
          },
        ],
        type: 'css',
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {},
          },
          {
            loader: 'stylus-loader',
            options: {},
          },
        ],
        type: 'css',
      },
		],
	},
}
