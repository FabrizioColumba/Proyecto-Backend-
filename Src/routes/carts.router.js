import BaseRouter from "./base.router.js";
import { CartServices } from "../services/services.js";
import cartControllers from "../controllers/cart.controllers.js";

export default class CartRouter extends BaseRouter {
    init(){
        this.get("/",["USER"], cartControllers.getUserCart)
    }
}

