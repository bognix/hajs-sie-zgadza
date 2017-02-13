const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
        filename: "app.css"
    }), extractFont = new ExtractTextPlugin({
        filename: "Roboto-Regular.ttf"
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
        extractSass,
        extractFont
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
            loaders: ExtractTextPlugin.extract({
                use: 'file-loader'
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.ttf'],
        modules: [
            'front/scripts',
            'config',
            'node_modules',
            'front/styles',
            'resources/fonts/roboto'
        ]
    },
    devtool: 'source-map'
};
