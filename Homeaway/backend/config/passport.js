// var JwtStrategy = require('passport-jwt').Strategy
// var ExtractJwt = require('passport-jwt').ExtractJwt
// var Traveler = require('../models/traveler')
// var config = require('./main')

// module.exports = function(passport) {
//     var opts = {}
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     console.log(opts)
//     opts.secretOrKey = 'secretToken';
//     passport.use(new JwtStrategy(opts, function(jwt_payload,done){
//         console.log(jwt_payload)
//         Traveler.findById(jwt_payload.userid,function(err, traveler){
//             if(err){
//                 return done(err,false)
//             }
//             if(traveler){
//                 return done(null,traveler)
//             }else{
//                 done(null,false)
//             }
//         })
//     }))
// }

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport')
const Traveler = require('../models/traveler')

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secretToken'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return Traveler.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(jwtPayload);
            });
    }
));