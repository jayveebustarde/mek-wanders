const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            // 'process.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
            'process.env.PUBLIC_URL': JSON.stringify(process.env.NODE_ENV === 'production' ? '/mek-wanders/' : '/')
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
        path: __dirname + '/dist',
        publicPath: process.env.NODE_ENV === 'production' ? '/mek-wanders/' : '/'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'), 
        },
        open: true
    }
};
