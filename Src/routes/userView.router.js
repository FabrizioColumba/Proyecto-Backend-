import userController from "../controllers/user.controller.js"
import BaseRouter from "./base.router.js"

export default class UserRouter extends BaseRouter{
    init(){

        this.get('/', ["PUBLIC"],userController.getAllUsers)
        
        this.put('/', ["USER","PREMIUM","ADMIN"], userController.putUser)
        
        this.delete('/',["USER","PREMIUM","ADMIN"],userController.deleteUser )
        
        this.post('/user', ["PUBLIC"], userController.getUser)
        
        this.post('/deleteInactiveUser', ["PUBLIC"], userController.deleteInactiveUser)
    }
}