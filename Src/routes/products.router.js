import BaseRouter from "./base.router.js";
import { CartServices, ProductServices } from "../services/services.js";
import productController from "../controllers/product.controller.js";

export default class ProductRouter extends BaseRouter {
  init(){
    this.get('/',["PUBLIC"],productController.getProducts)

    this.post('/', ["USER"], productController.addProductCart)

    this.get('/:pid', ["PUBLIC"],productController.getProduct )

    this.post('/',["ADMIN"],productController.postProduct)

    this.put('/:pid',["ADMIN"],productController.putProduct )

    this.delete('/:pid',["ADMIN"],async (req,res)=>{
        const {pid}= req.params
        const deleteProduct= await ProductServices.deleteProduct(pid)
        res.send({status:'success', message: 'Producto eliminado', payload: deleteProduct})
    })
  }
}
  
