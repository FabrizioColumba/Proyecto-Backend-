import BaseRouter from "./base.router.js";
import { passportCall } from "../middlewares/auth.js";
import { generateToken} from "../util.js"

export default class SessionRouter extends BaseRouter{
    init(){

        this.post('/register', ['NO_AUTH'], passportCall('register', { strategyType: "locals" }), async (req, res) => {
            try {
                res.send({ status: 'success', message: 'Registered successfully' })
            } catch (error) {
                console.log(error);
            }
        })

        this.post('/login',['NO_AUTH'],passport.Call("login",{failureRedirect:"api/sessions/loginFail"}), async (req,res)=>{
            try {
                const user = {
                   name: `${req.user.first_name} ${req.user.last_name}`,
                   role: req.user.role,
                   id: req.user.id,
                   email: req.user.email
               }
               const access_token = generateToken(user);
               return res.cookie('authToken', access_token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,

            }).sendSuccess('Login successful')
            } catch (error) {
                console.log(error)
            }
            return res.sendStatus(200);
        })
        this.get('/github',['github'],passportCall('github',{ strategyType: "github" }),(req,res)=>{});
        
        this.get('/githubcallback',['github'],passportCall('github',{ strategyType: "github" }),(req,res)=>{
            try {
                const user = {
                    id: user.id,
                    name: user.first_name,
                    role:user.role,
                    email:user.email
                }
                const access_token = generateToken(user)
                console.log('entro al return');
                return res.cookie('authToken', access_token, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                }).sendSuccess('Login successful with github!')
            } catch (error) {
                console.log(error);
            }
        })
        this.get('/profile',authToken,async(req,res)=>{
            console.log(req.user);
            res.send({status:"success",payload:req.user})
        })
        
        this.get('/logout',['PUBLIC'],async (req, res) => {
            try {
                return res.clearCookie('authToken').send('logged out successfully')
            } catch (error) {
                console.log(error, 'logout error acá');
            }
        })

        this.get('/current',['AUTH'], passportCall('jwt', {strategyType: 'locals'}), (req, res) => {
            try {
                return res.sendSuccess(req.user);
            } catch (error) {
                return res.sendInternalError(error);
            }
        });
    }
}



