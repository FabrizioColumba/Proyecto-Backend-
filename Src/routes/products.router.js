import BaseRouter from "./base.router.js";
import { cartServices, productServices } from "../services/services.js";
import productController from "../controllers/product.controller.js";

export default class ProductRouter extends BaseRouter {
  init(){
    this.get('/',["USER","PREMIUM","ADMIN"],productController.getProducts)

    this.post('/addProduct', ["USER","PREMIUM"], productController.addProductCart)

    this.get('/:pid', ["PUBLIC"],productController.getProduct )

    this.post('/newproduct',["ADMIN","PREMIUM"],productController.postProduct)

    this.put('/:pid',["ADMIN","PREMIUM"],productController.putProduct )

    this.delete('/:pid',["ADMIN","PREMIUM"],async (req,res)=>{
        const {pid}= req.params
        const deleteProduct= await productServices.deleteProduct(pid)
        res.send({status:'success', message: 'Producto eliminado', payload: deleteProduct})
    })
  }
}
  
