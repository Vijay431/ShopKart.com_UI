var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: './scripts/bundle.js'
    },
    devServer: {
        inline: true,
        port: 7000
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["@babel/preset-env", "@babel/preset-react"],
                }
            },
            {
                test : /\.css$/,
                loader : 'style-loader'
            },
            {
                test : /\.css$/,
                loader : 'css-loader',
                options : {
                    sourceMap : true,
                    importLoaders : 2,
                    modules : {
                        localIdentName : '[name]__[local]__[hash:base64:5]',
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/Assets/images/[name].[ext]"
            },
            {
              test: /\.json$/i,
              loader: 'raw-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};
