import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename= fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)
export default __dirname

import bcrypt from 'bcrypt';

export const createHash = async(password) => {
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts);
}

export const validatePassword = (password, hashedPassword) => bcrypt.compare(password,hashedPassword);


import jwt from 'jsonwebtoken'
export const generateToken= (user, expiresIn='24h')=>{
    const token= jwt.sign(user,'jwtSecret', {expiresIn})
    return token
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


export const cookieExtractor = (req) =>{
    let token = null; 
    if(req&&req.cookies) {
        token = req.cookies['authToken']
     
    }
    return token;
}


import fs from 'fs'
import Handlebars from 'handlebars'

export const generateMailTemplate= async (template, payload)=>{
   
    const content= await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`, 'utf-8')
    const preCompiled= Handlebars.compile(content)
    const compiledContent= preCompiled({...payload})
    return compiledContent
}