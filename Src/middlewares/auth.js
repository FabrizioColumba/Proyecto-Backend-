import bcrypt from 'bcrypt';
import passport from 'passport';

export const privacy = (privacyType) => {
    return (req, res, next) =>{
        const {user} = req.session;
        switch (privacyType) {
            case "PRIVATE" :
                if (user) next();
                else res.redirect("/login")
                break;
            case "NO_AUTHENTICATED":
                if (!user) next()
                else res.redirect("/products")   
        }
    }
}
export const createHash = async (password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const validatePassword = (password,hashedPassword) => bcrypt.compare(password,hashedPassword);

export const passportCall = (strategy,options={}) =>{
    return async(req,res,next) =>{
    passport.authenticate(strategy,(error,user,info)=>{
        if(error) return next(error);
        if(!user) return res.sendUnauthorized(info.messafe?info.message:info.toString())
        req.user = user;
        next();
        })(req,res,next);
    }
}
export const cookieExtractor = (req) =>{
    let token = null; 

    if(req&&req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}

