import { Router } from "express";
import userModel from "../dao/mongo/models/userModel.js";

const router= Router()

router.post('/register', async (req,res)=>{
    try {
        const result = await userModel.create(req.body)
        res.send({status: 'success', payload: result})
    } catch (error) {
        console.log(error);
        res.send({status:"error", error:"error interno"});
    }
})


router.post('/login', async (req,res)=>{
    const {email, password} = req.body
    if(email === "adminCoder@coder.com" && password === "coder123"){
        req.session.user = {
            name: `AdminCoder`,
            email: "...",
            role : "admin"
        }
        return res.sendStatus(200);
    };
    const user = await userModel.findOne({email,password})
    if(!user) return res.send({status: 'error', error: 'User not found'})

    //si existe creo la session: 
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.send({status: "success", })
})

export default router