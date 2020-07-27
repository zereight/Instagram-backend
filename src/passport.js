import passport from "passport";
import { ExtractJwt, JwtStrategy } from "passport-jwt";
import User from "./models/User";

console.log(process.env.JWT_SECRET);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (payload, done)=>{
    try {
        const user = await User.findOne({id: payload.id});
        if(user) {
            return done(user, true);
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
            req.user = user;
        }
        next();
    })(req,res,next);
}