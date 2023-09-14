import BaseRouter from "./base.router.js";
import productController from "../controllers/product.controller.js";
import { productsUploader } from "../middlewares/multerMiddlewares.js";

export default class ProductRouter extends BaseRouter {
  init(){
    this.get('/',["PUBLIC","USER","PREMIUM","ADMIN"],productController.getProducts)

    this.post('/addProductTocart', ["USER","PREMIUM"], productController.addProductCart)

    this.get('/:pid', ["PUBLIC"],productController.getProduct )

    this.post('/newproduct',["ADMIN","PREMIUM"],productsUploader,productController.postProduct)

    this.put('/:pid',["ADMIN","PREMIUM"],productController.putProduct )

    this.delete('/deleteProduct/:pid',["ADMIN","PREMIUM"],productController.deleteProduct)
  }
}
  
