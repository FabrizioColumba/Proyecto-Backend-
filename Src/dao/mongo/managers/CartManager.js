import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";


export default class CartManager {
    //Crea los carritos
    createCart = (cart) =>{
        return cartModel.find(cart);
    }
    //Trae los carritos
    getCart = () =>{
        return cartModel.find().lean().populate("products.products");
    }
    //Trae un carrito por id
    getCartById = (cid) => {
        return cartModel.findById(cid).lean().populate("products.products");
    }
    updateCart = (cart) => {
        return cartModel.updateMany(cart).lean().populate("products.products");
    }

    deleteCart = (cid) => {
        return cartModel.findByIdAndDelete(cid);
    }
    deleteProductInCart = (cid, products) => {
        return cartModel.deleteMany(cid,products);
    }
    addProductInCart = (cid,pid) =>{
        return cartModel.updateOne( {_id:cid}, { $push: {products: {product: new mongoose.Types.ObjectId(pid) } } } )
    }
}
