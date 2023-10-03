import BaseRouter from "../base.router.js";
import { cartServices, tiketServices } from "../../services/services.js";
import { generateTiketsData } from "../../middlewares/ticket.middleware.js";
export default class CartView extends BaseRouter{
    init(){
      
        this.get('/cart', ["USER", "PREMIUM"], async (req,res)=>{
         
            const username = req.user.name
            const cart = req.user.cart
            const cid = cart[0]._id
            const cartDb = await cartServices.getCartById(cid)
      
        let listFinalDeProducts =[]
        const CartI = cartDb.products.map(p=>{
          const obj = {
            id: p.product._id,
            description: p.product.description,
            price: p.product.price,
            img: p.product.img,
            category: p.product.category,
            quantity: p.quantity
          }

         listFinalDeProducts.push(obj)
        })

         
          res.render('cart',{
            cid:cid,
            listFinalDeProducts:listFinalDeProducts,
            totalAmount: cartDb.totalAmount,
            totalQuantity:  cartDb.totalQuantity,
            username:username
          })
       })

    this.get('/:cid/purchase', ["ADMIN",'USER',"PREMIUM"], generateTiketsData, async (req, res) => {
            const email = req.user.email
            const tiketDb = await tiketServices.getTiket("purchaser", email)
              
            const tiket ={
              code: tiketDb.code,
              totalQuantity: tiketDb.totalQuantity,
              amount: tiketDb.amount,
              purchaser:tiketDb.purchaser,
              dataTime: tiketDb.created_at
            }
            console.log(tiket)
               res.render('tiketcompra',{
              tiket:tiket
            })
              });
    }
}