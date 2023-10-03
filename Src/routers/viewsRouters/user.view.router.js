import RouterPadre from '../router.js'
import {userServices} from '../../services/services.js'


export default class UserViewRouter extends RouterPadre{
    init(){
        

        this.get('/premiumDocumentsForm',["ADMIN","PREMIUM","USER"], async (req,res)=>{
            res.render('FormPremiumDocuments')
        })
        
        this.get('/users', ["USER","ADMIN","PREMIUM"], async (req,res)=>{
            const users= await userServices.getUsers()
            const role= req.user.role
            const isAdmin = role === "ADMIN"
            const isUserOrPremium = role === "USER" || role === "PREMIUM"
            const isPremium=  role === "PREMIUM"
            const isUser= role === "USER"

            res.render('users',{
                users:users,
                isAdmin,
                isUserOrPremium:isUserOrPremium,
                isPremium,
                isUser,
             
            })
        })

        this.get('/updateuser/:uid',["USER","PREMIUM","ADMIN"], async (req,res)=>{
            const {uid}= req.params
            const userDb= await userServices.getUserById(uid)
            const user={
                first_name: userDb.first_name,
                last_name: userDb.last_name,
                alias:userDb.alias,
                email:userDb.email,
                id: userDb._id

            }
            res.render('formUpdateUser',{
                user:user
            })
        })

    }//cierre init

}