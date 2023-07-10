import { generateToken } from "../util.js";

const registerUser=async (req,res)=>{
    try{
        console.log(`llego a la ruta de registro el user con el siguiente carrito ${req.user.cart}`)
        res.send({status:'success', message:`Usuario ${req.user.name} registrado`})
       }
       catch(error){
        console.log(error)
       }

}

const loginUser=async (req,res)=>{
    try{
               
        const accessToken = generateToken(req.user);

        res.cookie('authToken',accessToken, {
            maxAge:1000*60*60*24,
        }).send({status:'success', message: `llego a login router ${req.user.name}`})
    }
    catch(error){
        console.log(error)
    }
}

export default{
    registerUser,
    loginUser
}