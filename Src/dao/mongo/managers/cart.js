import CartModel from "../models/cart.js";

export default class CartManager {
    getCarts = (params) =>{
        return CartModel.find(params).lean();
    }

    createCarts = (params) =>{
        return CartModel.find(params);
    }

    getCartsById = (params) => {
        return CartModel.findById(params).lean();
    }

    addProductInCart = (params) =>{
        
    }
}
