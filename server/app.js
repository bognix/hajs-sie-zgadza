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

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(router);

app.listen(server_port, server_ip_address, function() {
    console.log('Server is running on port 3000');
});
