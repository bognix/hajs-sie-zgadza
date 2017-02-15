const express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    config = require('./../webpack.config'),
    handlebars = require('express-handlebars'),
    router = require('./router'),
    app = express();

app.use(express.static(__dirname + '/public/')); //Don't forget me :(

app.engine('.hbs', handlebars({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

config.plugins.push(new webpack.HotModuleReplacementPlugin());
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
