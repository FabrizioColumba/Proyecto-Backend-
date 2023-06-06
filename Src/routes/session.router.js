import { Router } from "express";
import UsersManager from '../dao/mongo/mangersMongo/usersManager.js'

const usersService= new UsersManager()

const router= Router()

router.post('/register', async (req,res)=>{
const result= await usersService.createUser(req.body)
res.send({status: 'success', payload: result})
})


router.post('/login', async (req,res)=>{
    const {email, password}= req.body
    const user= await usersService.getUser({email,password})

    if(!user) return res.send({status: 'error', error: 'User not found'})

    //si existe creo la session: 
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.send({status: "success", })
})

export default router