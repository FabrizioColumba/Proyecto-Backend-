import RouterPadre from '../router.js'
import jwt from 'jsonwebtoken'
import {userServices} from '../../services/services.js'
import UserPresenterDTO from '../../dto/user/presenterUserDTO.js'


export default class ProfilesViewRouter extends RouterPadre{
    init(){
  
       this.get('/profilepremium',["PREMIUM"], async (req,res)=>{

            res.render('profilepremium',{
                css:'profilepremium'
            })
        })

        this.get('/profileuser', ["USER"], async (req,res)=>{
            res.render('profileuser')
        })


        this.get('/restoreRequest', ["PUBLIC"], async (req,res)=>{
            res.render('restoreRequest')
        })

       this.get('/newPswRestore', ["PUBLIC"], async(req,res)=>{
        try{
            const {token}=req.query
            const validateToken= jwt.verify(token,'jwtSecret')
            res.render('newPswRestore')
        }
        catch(error){
           res.render('tokenInvalido')
        }
       })

       this.get('/userData', ["USER", "PREMIUM"], async (req,res)=>{
        const userDb= await userServices.getUser('email', req.user.email)
        const imgProfile= userDb.imgProfile
        const user={
            name:req.user.name,
            email:req.user.email,
            role:req.user.role,
            imgProfile: imgProfile,
            id: userDb._id
        }
        res.render('userData',{
            user:user
        })
    })

    this.get('/bntconvertpremium', ["USER", "PREMIUM","ADMIN"], async(req,res)=>{
        const userId= req.user.id
        console.log(userId)
        res.render('btnConverTopremium',{
            userId:userId
        })
    })


    }//cierre del init
}