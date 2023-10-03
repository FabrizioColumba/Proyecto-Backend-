import passport from 'passport';
import local from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {createHash,validatePassword, cookieExtractor } from '../util.js';
import GithubStrategy from 'passport-github2';
import { userServices } from '../services/services.js';
import config from '../config.js'; 
import { cartServices } from '../services/services.js';


const LocalStrategy = local.Strategy;
const admin1 = config.admin.emailemail1
const admin2 = config.admin.emailemail2
const adminPassword = config.admin.adminPassword

const initializePassportStrategies = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, role,user_name } = req.body;
          if(!first_name && !last_name && !email && !password){
            return done(null, false, { message:'Datos incompletos' });
          }
          
          const exists = await userServices.getUser("email", email );

          if (exists){
           return done(null, false, { message: 'El usuario ya existe' });
          }
          else {
            const hashedPassword = await createHash(password);
            const cart = await cartServices.createCart();

            const user = {
              first_name,
              last_name,
              user_name,
              email,
              password: hashedPassword,
              role,
              cart: cart._id
            };
            const newUser= RegisterUserDTO.getFrom(user)
            const result = await userServices.createUser(user);
            done(null, result);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        if(email === "admin2" && password === "adminPassword"){
            const userAdmin = await userServices.getUser("email",email)
            const user = {
                id: userAdmin._id,
                name: `Admin`,
                email: "...",
                role : "ADMIN",
                user_name: "admin"
            };
            return done(null,user);
            } else{

              let user;
              
              user = await userServices.getUser("email", email)
            
            if (!user)
            return done(null, false, { message: 'Credenciales incorrectas' });
            
            const isValidPassword = await validatePassword(password, user.password);
            if (!isValidPassword){
            return done(null, false, { message: 'Contraseña inválida' });
            }

            user = {
             id: user._id,
             name: `${user.first_namename}``${user.last_namename}`,
             email: user.email,
             role: user.role,
             cart: user.cart
            }
            return done(null, user);
          };
    })
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.89bb44392bb568c3',
        clientSecret: 'a183be5e16a1f5470c0054b61cc37abfa804c2cd',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json;
          const user = await userServices.getUser({ email });
          if(!user) {
            const newUser =  {
              first_name: name,
              email,
              password:''
            }
            const result = await userServices.createUser(newUser);
            done(null,result);
          }
          done(null,user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use('jwt', new Strategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:'JwtKeySecret'
  }, async(payload,done)=>{
      return done(null,payload);
  }))
};
export default initializePassportStrategies;