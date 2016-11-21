const configAuth = require('./config/auth'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientId,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function (token, refreshToken, profile, done) {
            console.log('user logged in');

            return done(null, {
                profile: profile,
                token: token
            });
        }));
};
