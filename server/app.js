const express = require('express'),
    passport = require('passport'),
    auth = require('./auth'),
    authConfig = require('../config/auth'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    config = require('./../webpack.config'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    handlebars = require('express-handlebars'),
    router = require('./router'),
    app = express();

app.engine('.hbs', handlebars({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(cookieSession({
    name: 'session',
    keys: ['123'],
    // Cookie Options
    maxAge: 60 * 60 * 1000 // 1 hour
}));

app.use(cookieParser());

auth(passport);
app.use(passport.initialize());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

app.get('/', (req, res) => {

    if (req.session.token) {

        res.cookie('token', req.session.token);
        res.cookie('user', req.session.userDisplayName);

    } else {

        res.cookie('token', '');
        res.cookie('user', '');

    }

    res.render('index', {
        clientId: authConfig.googleAuth.clientId,
        layout: false,
    });
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/spreadsheets']
}));

app.get('/logout', (req, res) => {

    req.logout();
    req.session = null;
    res.redirect('/');

});

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {

        req.session.token = req.user.token;
        req.session.userDisplayName = req.user.profile.displayName;
        res.redirect('/');

    }
);

app.use(router);

app.listen(3000, () => {

    console.log('Server is running on port 3000');

});
