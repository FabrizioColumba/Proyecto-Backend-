import { userServices } from "../services/services.js";
import MailingService from "../services/MailServices/mail.js";
import config from "../config.js";
import Dtemplates from "../constants/Dtemplates.js";

const port = config.app.PORT
const urlDeploy= ''

const createUser = async (req, res) => {
    try{
        const user = req.body
        const createUser = await userServices.createUser(user)
        return res.sendSuccess({user})
    }catch(err){
        ErrorService.createError({
            name: "Error creating user",
            cause: err
        })
        return res.sendBadRequest(err)
    }
}
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


const getUser= async(req,res)=>{
    try{
        const {email}=req.body
        const user = await userServices.updateUserBy('email', email)
        res.send({status:'success', payload: user})
  
 }
 catch(error){
    console.log(error)
}}

const deleteUser=async(req,res)=>{
    try{
        const {uid} = req.params
        const user = await userServices.getUserById(uid)
        const username = `${user.first_name} ${user.last_name}`
        const userEmail = user.email
        const mailingService = new MailingService()
        const sendEmail = await mailingService.sendMail(userEmail, Dtemplates.DELETE_USER,username)
        const result = await userServices.deleteUser(uid)
        res.send({status:'success'})
        }
        catch(error){
            console.log(error)
        }
}




export default{
    createUser,
    getAllUsers,
    putUser,
    deleteUser,
    getUser,
}