import BaseRouter from "../base.router.js";
import { CartServices } from "../../services/services.js";

export default class CartView extends BaseRouter {
    init(){
        this.get('/cart', ["USER"], async (req,res)=>{
            
            const user = req.user
            const cid = req.user.cart[0]._id
            const cart = await CartServices.getCartById(cid)
          
            res.render('cart',{
                user,
                cart,
                css:'cart'
            })
        })

    }
}