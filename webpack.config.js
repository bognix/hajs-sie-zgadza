const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require('webpack').DefinePlugin;

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});


const apiKey = process.env.FIREBASE_API_KEY,
    authDomain = process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL = process.env.FIREBASE_DATABASE_URL,
    storageBucket = process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;

const replaceVars = new DefinePlugin({
    'CONFIG_FIREBASE_API_KEY': `'${apiKey}'`,
    'CONFIG_FIREBASE_AUTH_DOMAIN': `'${authDomain}'`,
    'CONFIG_FIREBASE_DATABASE_URL': `'${databaseURL}'`,
    'CONFIG_FIREBASE_STORAGE_BUCKET': `'${storageBucket}'`,
    'CONFIG_FIREBASE_MESSAGING_SENDER_ID': `'${messagingSenderId}'`
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
        replaceVars
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
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }, {
            test: /\.svg$/,
            loader: 'file-loader?name=[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.ttf', '.svg'],
        modules: [
            'front/scripts',
            'config',
            'node_modules',
            'front/styles',
            'front/resources'
        ]
    },
    devtool: 'source-map'
};
