import BaseRouter from "./base.router.js";
import { passportCall } from "../middlewares/auth.js";
import { UserServices } from "../services/services.js";
import sessionController from "../controllers/session.controller.js";

export default class SessionRouter extends BaseRouter{
    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionController.registerUser)

        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionController.loginUser)
    }
}



