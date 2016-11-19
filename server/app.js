const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./../webpack.config'),
    path = require('path');

auth(passport);
app.use(passport.initialize());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/spreadsheets']}));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
