var path = require('path');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './front/scripts/index.js',
        './front/styles/app.scss'
    ],
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/scripts/'
    },
    plugins: [],
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
            loaders: ["style-loader", "css-loader", "sass-loader"]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss'],
        modules: [
            'front/scripts',
            'config',
            'node_modules',
            'front/styles'
        ]
    },
    devtool: 'source-map'
};
