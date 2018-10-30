var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var Traveler = require('../models/traveler')
var config = require('./main')

module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secretToken';
    passport.use(new JwtStrategy(opts, function(jwt_payload,done){
        Traveler.findById(jwt_payload._id,function(err, traveler){
            if(err){
                return done(err,false)
            }
            if(traveler){
                return done(null,traveler)
            }else{
                done(null,false)
            }
        })
    }))
}