import passport from "passport";
import local from 'passport-local'
import { Strategy, ExtractJwt } from 'passport-jwt';
import { cookieExtractor, createHash, validatePassword } from "../util.js"
import GithubStrategy from 'passport-github2';
import {userServices} from '../services/services.js'
import config from  '../config.js'
import {cartsService} from '../services/services.js'
import  RegisterUserDTO from '../dto/user/registerUserDTO.js'


const LocalStrategy= local.Strategy
const admin1= config.admin.emailemail1
const admin2= config.admin.emailemail2
const adminPassword= config.admin.adminPassword

const passportStrategies=()=>{
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email'},
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, role,alias } = req.body;
          if(!first_name && !last_name && !email && !password){
            return done(null, false, { message:'Datos incompletos' });
          }
          const exists = await userServices.getUser("email", email);
          if (exists){  
            return done(null, false, { message:'El usuario ya existe' });           
          }
        else{
          const hashedPassword = await createHash(password);
          const cart={
            owner:email
          }
          const createdCart= await cartsService.createCart(cart)
          const user = {
            first_name,
            last_name,
            alias,
            email,
            password: hashedPassword,
            role,
            cart:  createdCart._id 
          };
          const newUser= RegisterUserDTO.getFrom(user)
          const result = await userServices.createUser(newUser);
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
            if ((email === adminEmail) && password === adminPassword) {
              const userAdmin =await userServices.getUser("email", email)
              const user = {
                id: userAdmin._id,
                name: `Admin`,
                role: 'ADMIN',
                email: 'admin2@correo',
                alias: "admin"
                
              };
              return done(null, user);
            }
            else{
              let user
              user = await userServices.getUser("email", email);
                
            if (!user){
              return done(null, false, { message: 'Correo no encontrado' });
            }
            const isValidPassword = await validatePassword(password, user.password);
            if (!isValidPassword){       
              return done(null, false, { message: 'Contraseña inválida' });
            }
            user = {
              id: user._id,
              name: `${user.first_name} ${user.last_name}`,
              email: user.email,
              role: user.role,
              cart: user.cart 
            };
            return done(null, user);
            } 
          }
        )
      );
    

      passport.use('jwt', new Strategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:'jwtSecret'
      }, async(payload,done)=>{
     

        return done(null,payload);
      }))
    
    };
export default passportStrategies

