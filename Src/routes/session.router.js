import BaseRouter from "./base.router.js";
import { passportCall } from "../middlewares/auth.js";
import sessionController from "../controllers/session.controller.js";

export default class SessionRouter extends BaseRouter{
    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionController.registerUser)
        
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionController.loginUser)

        this.get('/github',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),(req,res)=>{});

        this.get('/githubcallback',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),sessionController.loginWidthGitHub)
    }
}



