import {userServices} from '../services/services.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import config from '../config.js'

const port =config.app.PORT
const urlDeploy= ''
const getAllUsers= async (req,res)=>{
    try{
        const users= await userServices.getUsers()
        res.send({status:'success', payload:users})
     }
     catch(error){
         console.log(error)
    }
}
const putUser = async (req, res) => {
    try {
        const uid= req.body.userId
        const userDb= await userServices.getUserById(uid)
        console.log(req.body)
        const newDataUser = {
            first_name: req.body.first_name || userDb.first_name,
            last_name: req.body.last_name || userDb.last_name,
            alias: req.body.alias || userDb.alias,
            email: req.body.email || userDb.email,
           
        }
        const user = await userServices.updateUser(uid,newDataUser)
        res.send({ status: "success" })
    } catch (error) {
        console.log(error)
    }
};

const deleteUser=async(req,res)=>{
    try{
        const {uid}= req.params
       const user= await userServices.getUserById(uid)
       const username= `${user.first_name} ${user.last_name}`
       const userEmail= user.email
        const mailingService= new MailingService()
        const sendEmail= await mailingService.sendMail(userEmail, Dtemplates.DELETE_USER,username)
        const result= await userServices.deleteUser(uid)
        res.send({status:'success'})
        }
        catch(error){
            console.log(error)
        }
}
const deleteInactiveUser= async(req,res)=>{
    const user= req.body
    console.log(user)
    const mailingService= new MailingService()
    const sendEmail= await mailingService.sendMail(user.email, Dtemplates.CIERRE_CUENTA_INACTIVA)
    const result= await userServices.deleteUser(user._id)
    res.send({status:'success', message:'Cuenta eliminada'})
}

 const getUser= async(req,res)=>{
    try{
        const {email}=req.body
        const user = await userServices.updateUserBy('email', email)
        res.send({status:'success', payload: user})
  
 }
 catch(error){
    console.log(error)
}
}
export default{
    getAllUsers,
    putUser,
    deleteUser,
    getUser,
    deleteInactiveUser
}