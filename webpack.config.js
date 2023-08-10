const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets/data', to: 'assets/data' }
            ]
        })
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'), 
        },
        open: true
    }
};
