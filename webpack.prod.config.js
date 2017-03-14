var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/js/main.js'
    ],
    output: {
        'path': __dirname + '/build',
        'filename': 'app.bundle.js'
    },
    devServer: {
        contentBase: './build',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{ from: 'node_modules/phaser/build/phaser.min.js', to: './' }])
    ]
};