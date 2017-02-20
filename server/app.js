var express = require('express'),
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
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

var server_port = process.env.PORT || 3000;

app.use(router);

app.listen(server_port, function() {
    console.log('Server is running on port ' + server_port);
});
