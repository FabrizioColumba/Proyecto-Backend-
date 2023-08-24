import BaseRouter from "./base.router.js";
import cartControllers from "../controllers/cart.controllers.js";
import productController from "../controllers/product.controller.js";
import {generateTiketsData} from "../middlewares/ticket.middleware.js"
import ticketControllers from '../controllers/ticket.controllers.js'


export default class CartRouter extends BaseRouter {
    init(){
        this.get("/",["USER","PREMIUM"], cartControllers.getUserCart)
        
        this.post("/deleteproductincart",["USER","PREMIUM"], productController.deleteProductCart)
        
        this.post('/:cid/purchase', ["USER","PREMIUM"],  generateTiketsData, ticketControllers.operacionTiket)
    
    }
}

