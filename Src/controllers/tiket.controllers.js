
import { tiketService ,cartsService} from "../services/services.js";
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'


const operacionTiket=async(req,res)=>{
  const cid= req.body.cid
  const cartDb= await cartsService.getCartById(cid)
  
  const confirmProductsInCart= cartDb.products
  if(confirmProductsInCart.length < 1){
    res.send({status:'error',error:'carrito vacio'})
   }

  else{
    const username= req.user.name
    const totalAmount= cartDb.totalAmount
    const totalQuantity= cartDb.totalQuantity
  
  let listFinalDeProducts=[]
  const integro= cartDb.products.map(p=>{
    const obj={
      id: p.product._id,
      description: p.product.description,
      price: p.product.price,
      category: p.product.category,
      talle: p.product.talle,
      color:p.product.color,
      amount: p.amount,
      quantity: p.quantity,
      owner: p.product.owner
    }
    listFinalDeProducts.push(obj)
  })
 
  const tiket={
    purchaser: req.user.email,
    totalQuantity:totalQuantity,
    amount:totalAmount,
    code: Math.random().toString()
  }
  const result = await  tiketService.createTiket(tiket)
 

  const tiketDb= await tiketService.getTiket('purchaser', req.user.email)
  const tid= tiketDb._id
  const payload={
    totalQuantity:tiketDb.totalQuantity,
    amount:tiket.amount
  }


  res.send({status:"success", tid:tid, cid:cid, payload:payload})


}}
const clearTiketAndCart= async(req,res)=>{
  const {cid, tid}= req.params
  const username= req.user.name
  const cartDb= await cartsService.getCartById(cid)
  
  const totalAmount= cartDb.totalAmount
  const totalQuantity= cartDb.totalQuantity

let listFinalDeProducts=[]
const integro= cartDb.products.map(p=>{
  const obj={
    id: p.product._id,
    description: p.product.description,
    price: p.product.price,
    category: p.product.category,
    amount: p.amount,
    quantity: p.quantity,
    owner: p.product.owner
  }
  listFinalDeProducts.push(obj)
})


const mail= 'fabricolumba@gmail.com'
const mailingService= new MailingService()
const sendEmail= await mailingService.sendMail([mail,req.user.email], Dtemplates.TIKET_COMPRA,{username,listFinalDeProducts,totalAmount})
  await cartsService.clearCart(cid) 
  await tiketService.deleteTiket(tid)
  res.send({status:"success"})
}

export default{
operacionTiket,
clearTiketAndCart
}
