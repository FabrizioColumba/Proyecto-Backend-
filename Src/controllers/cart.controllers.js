import { cartsService } from "../services/services.js"

const getUserCart=async(req,res)=>{
    try{
    const cart= req.user.cart[0]
    res.send({status:"success", payload:cart })
    }
    catch(error){
    console.log('Error getUserCart:', error)
    }
}

const clearCart=async (req,res)=>{
try{
  const cid= req.body.cid
  const result=await cartsService.clearCart(cid)
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