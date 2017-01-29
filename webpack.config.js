var path = require('path');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './front/index.js'
    ],
    output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/scripts/'
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js*/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'},
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'front',
            'node_modules'
        ]
    },
    devtool: 'source-map'
};
