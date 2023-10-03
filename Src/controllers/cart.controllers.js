import { cartServices } from "../services/services.js"

const getUserCart = async(req,res)=>{
    try{
        cart= req.user.cart
        console.log(req.user.cart)
        res.send({status:"success", payload:cart })
      }
      catch(error){
        console.log(error)
      }
}
const clearCart=async (req,res)=>{
  try{
    const cid= req.body.cid
    const result=await cartServices.clearCart(cid)
    res.send({status:'success'})
  }
  catch(error){
    console.log(error)
  }
  }
  
  
  export default{
      getUserCart,
      clearCart
  }
