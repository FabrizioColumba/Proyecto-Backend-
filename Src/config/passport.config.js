import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { userServices } from '../services/services.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {createHash,validatePassword } from '../util.js';
import { cookieExtractor } from '../middlewares/auth.js';
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
          const { first_name, last_name } = req.body;
          const exists = await userServices.getUser({ email });

          if (exists) return done(null, false, { message: 'El usuario ya existe' });
          else{
            const hashedPassword = await createHash(password);
            const cart = await cartServices.createCart();

            const user = {
              first_name,
              last_name,
              email,
              password: hashedPassword,
            };
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
            const user = {
                id:0,
                name: `Admin`,
                email: "...",
                role : "admin"
            };
            return done(null,user);
            } else{

              let user;
              
              user = await userServices.getUser("email", email)
            
            if (!user)
            return done(null, false, { message: 'Credenciales incorrectas' });
            
            //sí existe el usuario, verifica el password encriptado
            
            const isValidPassword = await validatePassword(password, user.password);
            if (!isValidPassword)
            return done(null, false, { message: 'Contraseña inválida' });
            //si existe y puso su contraseña correcta, devuelvo el usuario
            user = {
              first_name: user.first_name,
              last_name: user.last_name,
              id: user.id,
              email: user.email,
              role: user.role
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
          console.log(profile);
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
    try {
      console.log(playload);
      return done(null,payload);
    } catch (error) {
      return done(error);
    }
  }))
};
export default initializePassportStrategies;