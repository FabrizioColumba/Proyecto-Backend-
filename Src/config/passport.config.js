import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import userModel from '../dao/mongo/models/userModel.js';
import { createHash,validatePassword } from '../util.js';

const LocalStrategy = local.Strategy;

const initializePassportStrategies = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;

          const exists = await userModel.findOne({ email });

          if (exists) return done(null, false, { message: 'El usuario ya existe' });

          const hashedPassword = await createHash(password);

          const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          };
          const result = await userModel.create(user);
          done(null, result);
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
        if(email === "adminCoder@coder.com" && password === "coder123"){
            const user = {
                name: `AdminCoder`,
                email: "...",
                role : "admin"
            }
            return done(null,user);
    };
    let user;

    user = await userModel.findOne({email})
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
          const user = await userModel.findOne({ email });
          if(!user) {
            const newUser =  {
              first_name: name,
              email,
              password:''
            }
            const result = await userModel.create(newUser);
            done(null,result);
          }
          done(null,user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    if (id === 0) {
      return done(null, {
        role: 'admin',
        name: 'ADMIN',
      });
    }
    const user = await userModel.findOne({ _id: id });
    return done(null, user);
  });
};
export default initializePassportStrategies;