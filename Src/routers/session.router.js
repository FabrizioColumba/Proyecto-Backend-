import {userServices} from '../services/services.js'
import RouterPadre from './router.js'
import { passportCall} from "../util.js"
import sessionControllers from '../controllers/session.controllers.js'

export default class SessionRouter extends RouterPadre{

    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionControllers.registerUser)

        this.post('/login',["NO_AUTH", "ADMIN"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        this.get('/github',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),(req,res)=>{});
     
        this.get('/githubcallback',["NO_AUTH"],passportCall('github',{strategyType:'locals'}),sessionControllers.loginWidthGitHub)

        this.post('/convertToPremium', ["USER","PREMIUM"], sessionControllers.convertToPremium)

        this.post('/revertPremium', ["USER","PREMIUM"], sessionControllers.revertPremium)

        this.post('/restoreRequest', ["PUBLIC"], sessionControllers.restoreRequest)

        this.post('/newPswRestore',["PUBLIC"], sessionControllers.newPswRestore )

        this.get('/cerrarsession', ["ADMIN", "USER","PREMIUM"],sessionControllers.cerrarsession)

    }//cierre del init
}//cierre de clase