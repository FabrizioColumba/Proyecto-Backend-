import BaseRouter from "../base.router.js";
import { CartServices, Productservices } from "../../services/services.js";
import generateTiketsData from "../../middlewares/ticket.middleware.js"

export default class CartView extends BaseRouter {
    init(){
        this.get('/cart', ["USER"], async (req,res)=>{
            
            const user = req.user
            const cid = req.user.cart[0]._id
            const cart = await CartServices.getCartById(cid)
            const products = cart.products

            const productId = products.map(p => p._id).join(',')
            let idlist = []
            idlist.push(productId)
            const productsColection = await Productservices.getProducts({ _id: { $in: idlist } });
            
            const finalList = [];
            for (let i = 0; i < products.length; i++) {
              const combinedProduct = { ...products[i] } 
              if (productsColection[i]) {
                combinedProduct.description = productsColection[i].description;
                combinedProduct.price = productsColection[i].price;
                combinedProduct.img = productsColection[i].img
                combinedProduct.category= productsColection[i].category
                
              }
              finalList.push(combinedProduct);
            }   

            res.render('cart',{
                user,
                cart, 
                cid,
                css:'cart',
                finalList:finalList
            })
        })
        this.get('/:cid/purchase', ['USER'], generateTiketsData, async (req, res) => {
            
            res.render('tiketcompra');
        });

    }
}