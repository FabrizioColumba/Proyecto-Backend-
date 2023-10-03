import {tiketService, userServices} from '../services/services.js'
import usersControllers from '../controllers/users.controllers.js'
import RouterPadre from './router.js'
import {documentsUploader} from '../middlewares/multer.middleware.js'
import {imgProfileUploader} from '../middlewares/multer.middleware.js'

export default class UserRouter extends RouterPadre{
    init(){

        this.get('/', ["PUBLIC", "USER", "ADMIN","PREMIUM"],usersControllers.getAllUsers)

        this.put('/', ["USER","PREMIUM","ADMIN"], usersControllers.putUser)
        this.delete('/:uid',["USER","PREMIUM","ADMIN"],usersControllers.deleteUser )
        this.post('/user', ["PUBLIC"], usersControllers.getUser)
        
        this.post('/postPremiumDocuments', ["USER","ADMIN","PREMIUM"],documentsUploader,usersControllers.postPremiumDocuments)
        this.post('/postImgProfile', ["USER","ADMIN","PREMIUM"],imgProfileUploader,usersControllers.postImgProfile)
        this.post('/deleteInactiveUser', ["PUBLIC"], usersControllers.deleteInactiveUser)
    }//cierre del init
}//cierre de la clase