const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});


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
        publicPath: 'http://localhost:3000/public/'
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
            loaders: 'file-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss'],
        modules: [
            'front/scripts',
            'config',
            'node_modules',
            'front/styles',
            'resources/fonts'
        ]
    },
    devtool: 'source-map'
};
