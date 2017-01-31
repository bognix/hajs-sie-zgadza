const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./../webpack.config'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(cookieSession({
    name: 'session',
    keys: ['123'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cookieParser());

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

app.get('/', function (req, res) {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.cookie('user', req.session.userDisplayName);
    } else {
        res.cookie('token', '');
        res.cookie('user', '');
    }

    res.render('index', {
        layout: false
    });
});

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/spreadsheets']}));

app.get('/logout', function (req, res) {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    function (req, res) {
        req.session.token = req.user.token;
        req.session.userDisplayName = req.user.profile.displayName;
        res.redirect('/');
    }
);

app.get('/spends', function(req, res) {
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
