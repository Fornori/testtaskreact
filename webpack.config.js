var path = require('path');
var webpack = require('webpack');
var ROOT = path.resolve(__dirname, 'src/main/resources/static');
var SRC = path.resolve(__dirname, 'src/main/resources/static/js');
var DEST = path.resolve(__dirname, 'src/main/resources/static/js/build');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: SRC + '/app.jsx',
    resolve: {
        modules: [
            path.resolve(ROOT, 'js'),
            path.resolve(ROOT, 'css'),
            "node_modules"
        ],
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: DEST,
        filename: 'testApp.js',
        publicPath: '/build/'
    },

    //Development
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(DEST),
        new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            }
        ),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ],
    //Production
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin()
    // ],
    cache: false,
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, '.'),
                include: SRC,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style!css!less'}
        ]
    }
};