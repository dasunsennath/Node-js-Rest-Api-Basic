const passport = require('passport');
const passport_JWT = require('passport-jwt');
const loacStratergy = require('passport-local').Strategy;
const JWTStraregy = passport_JWT.Strategy;
const Extract = passport_JWT.ExtractJwt;
const JWT = require('jsonwebtoken');
const config  = require('./Config');
const User = require('./Modules/User');



module.exports.getToken = (user)=>
{
   return JWT.sign(user,config.Secret,{expiresIn:"7d"});
}

const option = {}
  option.jwtFromRequest=Extract.fromAuthHeaderAsBearerToken();
   option.secretOrKey=config.Secret;


passport.use(new JWTStraregy(option,(payload,done)=>
{ 
    User.findOne({_id:payload._id},(err,user)=>
    {
        if(err)
        {
            return done(err,false);
        }
        else if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    })

}));


exports.verify = passport.authenticate('jwt',{session:false});

// exports.local = passport.use(new loacStratergy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());