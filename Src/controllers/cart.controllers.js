getUserCart = async(req,res)=>{
    try{
        cart= req.user.cart
        console.log(req.user.cart)
        res.send({status:"success", payload:cart })
      }
      catch(error){
        console.log(error)
      }
}

export default{
    getUserCart
}