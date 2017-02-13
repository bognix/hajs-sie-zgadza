const configAuth = require('../config/auth'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientId,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
        (token, refreshToken, profile, done) => done(null, {
            profile,
            token
        })));
};
