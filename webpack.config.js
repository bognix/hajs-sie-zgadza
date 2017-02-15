const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});


module.exports = {
    entry: [
        './front/scripts/index.js'
    ],
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        extractSass
    ],
    module: {
        rules: [{
            test: /\.js*/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }, {
            test: /\.scss$/,
            loader: extractSass.extract({
                loader: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }, {
            test: /\.ttf$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.ttf'],
        modules: [
            'front/scripts',
            'config',
            'node_modules',
            'front/styles'
        ]
    },
    devtool: 'source-map'
};
