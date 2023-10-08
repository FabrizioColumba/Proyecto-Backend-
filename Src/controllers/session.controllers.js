import {generateToken} from "../util.js"
import {userServices} from '../services/services.js'
import RestoreTokenDTO from '../dto/user/restoreRequesTokenDTO.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import jwt from 'jsonwebtoken'
import {validatePassword, createHash} from "../util.js"

const registerUser = async (req,res)=>{
    try{
      console.log("hello")
      const userEmail = req.user.email
      const username = req.user.first_name

        res.send({status:'success', payload:req.user})
       }
       catch(error){
        console.log('Error catch register:', error)
       }
}

const loginUser=async (req,res)=>{
    try{
      if(req.error === 'Correo no encontrado' || req.error === 'Contraseña inválida'){
        console.log(req.error)
        res.send({status:'error', error: req.error})
      }
      else{
        const role = req.user.role
        const uid = req.user.id
          const accessToken = generateToken(req.user);
          const connectionDate = new Date()
          const expirationDate = new Date(connectionDate)
          expirationDate.setDate(connectionDate.getDate() +30)
          const user = await userServices.updateUserLastConection(uid,connectionDate)
          const exp = await userServices.updateUserExpiration(uid,expirationDate)
          return res.cookie('authToken',accessToken, {
              maxAge:1000*60*60*24,
              httpOnly:true,
          }).send({status:'success', userrole:role})
      }}
    catch(error){
       console.log('Error catch login:', error)
    }
}

const restoreRequest = async(req,res)=>{
  const {email} = req.body
  const user = await userServices.getUser("email", email)
  if(user){
   const restoreToken = generateToken(RestoreTokenDTO.getFrom(user),'1h')
   const mailingService = new MailingService()
    const result = await mailingService.sendMail(user.email, Dtemplates.RESTORE_PASSW,{restoreToken})
   res.clearCookie('authToken').send({status:"success"})
  
  }
  if(!user){
   res.send({status:"error", error: "Correo no encontrado"})
  }
}

const newPswRestore=async(req,res)=>{
 try{
  const{password, token}=req.body
  const userToken = jwt.verify(token,'jwtSecret')
  const user = await userServices.getUser("email",userToken.email)
  const comparePassword = await validatePassword(password, user.password)
  if(comparePassword){
    res.send({status:'error', error: 'misma contraseña'})
  }
const hashPassword = await createHash(password)
  await userServices.updateUser(user._id, {password:hashPassword })
  res.send({status:'success', message:'Contraseña modificada'})
 }
catch(error){
  console.log(error)
}
}

const cerrarsession=async(req,res)=>{
 try{
  res.clearCookie('authToken').send({status:"success"})
 }
 catch(error){
  console.log(error)
 }
}

export default{
    registerUser,
    loginUser,
    restoreRequest,
    newPswRestore,
    cerrarsession
}