import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "./models/User";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new Strategy(jwtOptions, async (payload, done)=>{
    try {
        const user = await User.findOne({_id: payload.id});
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

passport.initialize();

export const authenticationJwt = (req,res,next) => {
    return passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user){
            // console.log(user);
            req.user = user;
        }
        next();
    })(req,res,next);
}