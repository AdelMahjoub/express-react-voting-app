const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

module.exports = function() {
  passport.use('local', new LocalStrategy({
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({email: username}, (err, user) => {
        if(err) {
          return done(err);
        }
        if(!user) {
          return done(null, false, { message: 'Invalid user name or password' });
        }
        user.comparePasswords(password, user.password, (err, isMatch) => {
          if(err) {
            return done(err);
          }
          if(!isMatch) {
            return done(null, false, { message: 'Invalid user name or password' });
          }
          return done(null, user);
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}