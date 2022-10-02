const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    /**
     * mode     标记构建模式
     *  development 开发模式  不会代码压缩或性能优化  打包速度快
     *  production  发布模式  会代码压缩与性能优化  打包速度慢
     *  none 无模式
    */
    mode: 'development',

    /**
     * 保存打包前代码的详细位置信息
     */
    devtool: 'eval-source-map',

    /**
     * entry    输入文件路径，开始打包的文件路径
     *
     * __dirname 当前文件绝对路径
    */
    entry: path.join(__dirname, './src/index.js'),

    /**
     * output   输出设定
     */
    output: {
        /**
         * path     输出文件路径
         */
        path: path.join(__dirname, './dist'),
        /**
         * filename     输出文件名称
         */
        filename: 'js/main.js',
    },

    /**
     * plugins    用于执行一些特殊任务
     */
    plugins: [
        /**
         * html-webpack-plugin    为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件
         */
        new HtmlPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        /**
         * clean-webpack-plugin    每次打包前清理 dist 目录
         */
        new CleanWebpackPlugin(),
        /**
         * fork-ts-checker-webpack-plugin    实现 ts 文件类型检查功能
         */
        new ForkTsCheckerWebpackPlugin(),
    ],

    /**
     * devServer
     */
    devServer: {
        /**
         * 初次打包完成后自动打开浏览器
        */
        open: true,
        /**
         * 指定host名
        */
        host: 'localhost',
        /**
         * 指定端口
        */
        port: 8080,
    },

    /**
     * module   协助 webpack 处理特定的文件模块（webpack本身只能处理js及json文件）
     */
    module: {
        rules: [
            // 处理 css 文件
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // 处理 less 文件
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            // 处理图片文件 jpg|png|gif
            {
                test: /\.jpg|png|gif$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        outputPath: 'images',
                    },
                },
            },
            // ?处理 ts 文件
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,     // 阻止进行ts类型检查
                        },
                    },
                ],
            },
            // 处理 js 文件
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    /**
     * resolve
     */
    resolve: {
        alias: {
            '@': path.join(__dirname, './src/'),
        },
    },
};
