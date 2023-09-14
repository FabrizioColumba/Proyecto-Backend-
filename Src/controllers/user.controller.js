import { UserServices } from "../services/services.js";

const getAllUsers= async (req,res)=>{
    try{
        const users= await UserServices.getUsers()
        res.send({status:'success', payload:users})
     }
     catch(error){
         console.log(error)
    }
}

const putUser=async(req,res)=>{
    try{
        const {uid}= req.user._id
        const user= req.body
        const newuser= await UserServices.updateUser(uid,user)
        res.send({status:"success", payload: newuser})
        }
        catch(error){
            console.log(error)
        }
}

const getUser= async(req,res)=>{
    try{
        const {email}=req.body
        const user = await UserServices.updateUserBy('email', email)
        res.send({status:'success', payload: user})
  
 }
 catch(error){
    console.log(error)
}
 }

const deleteUser=async(req,res)=>{
    try{
        const uid= req.user._id
        
        const result= await UserServices.deleteUser(uid)
        res.send({status:"success", message: `Se eliminó ${result.first_name}`})
        }
        catch(error){
            console.log(error)
        }
}

const postPremiumDocuments = async (req, res) => {
    const indentificacion=  req.files['identificacion'][0].filename
    const comprobanteDomicilio= req.files['comprobanteDomicilio'][0].filename
    const comprobanteCuenta= req.files['comprobanteEstadoCuenta'][0].filename
    const documnments=[
        {
            name: 'Identificación',
            reference: `http://localhost:8080/api/documents/${indentificacion}?folder=documents`
        },
        {
            name: 'Comprobante de domicilio',
            reference: `http://localhost:8080/api/documents/${comprobanteDomicilio}?folder=documents`
        },
        {
            name: 'Comprobante de Estado de cuenta',
            reference: `http://localhost:8080/api/documents/${comprobanteCuenta}?folder=documents`
        }
    ]
    const response= await UserServices.updateUserBy('email',req.user.email,{'documents': [...documnments]})
    console.log(documnments)
    res.send({ status: 'success' });
};

const postImgProfile = async (req, res) => {
    try{
       const filename= req.file.filename
       const imgProfile= `http://localhost:8080/api/documents/${req.file.filename}?folder=profile`
       const response= await UserServices.updateUserBy('email',req.user.email,{'imgProfile':imgProfile})
        res.send({ status: 'success' })
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
    postPremiumDocuments,
    postImgProfile
}