import { CartServices, Productservices } from "../services/services"

export const generateTiketsData= async(req,res,next)=>{
    const user = req.user
              const cid = req.user.cart[0]._id
              const cart = await CartServices.getCartById(cid)
              const useremail = req.user.email
              const products =cart.products
  
              const productIds = products.map(p => p._id).join(',')
              let listid= []
              listid.push(productIds)
              const productsColection = await Productservices.getProducts({ _id: { $in: listid } });
        
              const listFinalDeProducts = [];
              for (let i = 0; i < products.length; i++) {
                const combinedProduct = { ...products[i] } 
                if (productsColection[i]) {
                  combinedProduct.description = productsColection[i].description;
                  combinedProduct.price = productsColection[i].price;
                  combinedProduct.img = productsColection[i].img
                  combinedProduct.category= productsColection[i].category
                  
                }
                listFinalDeProducts.push(combinedProduct);
              }  
              
              req.userTiketInfo = {
                productsComprados:listFinalDeProducts,
                usercart: cart,
                useremail: useremail
              }
              next()
  }