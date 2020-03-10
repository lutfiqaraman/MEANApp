const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users.model");

require("dotenv").config({ path: "./config/.env" });

module.exports = function(passport) {
  let opts = {};

  opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;

  passport.use(
    new jwtStrategy(opts, function(jwt_payload, done) { 
      User.findOne({ id: jwt_payload._id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
