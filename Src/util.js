import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname


export const createHash = async (password) =>{
    //Generar los salts
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const cookieExtractor = (req) =>{
    let token = null; 

    if(req&&req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}

export const generateToken= (user)=>{
    const token= jwt.sign(user,'JwtKeySecret', {expiresIn: '24h'})
    return token
}
export const generateMailTemplate= async (template, payload)=>{
    const content= await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`, 'utf-8')
    const preCompiled= Handlebars.compile(content)
    const compiledContent= preCompiled({...payload})
    return compiledContent
}
import passport from 'passport'
export const passportCall = (strategy,options={}) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy,(error,user,info)=>{
            if(error)return next(error);
           
            if(!options.strategyType){
                console.log(`Route ${req.url} no se definió la strategyType`);
                return res.sendServerError();
            }
            if(!user) {
                
                switch(options.strategyType) {
                    case 'jwt':
                        req.error = info.message?info.message:info.toString;
                        
                        return next();
                    case 'locals':
                       req.error= info.message?info.message:info.toString;
                       return next();
                }
            }
            req.user = user;
            next();
        })(req,res,next);
    }
}
