import cartModel from "../mongo/models/cartModel.js";
import productModel from "../models/productsModel.js";


export default class CartManager {
    //Crea los carritos
    createCart = (cart) =>{
        return cartModel.create({products:[]});
    }
    //Trae los carritos
    getCart = () =>{
        return cartModel.find().lean().populate("products");
    }
    //Trae un carrito por id
    getCartById = (cid) => {
        return cartModel.findById(cid).lean().populate("products");
    }
    updateCart = (cart) => {
        return cartModel.updateMany(cart).lean().populate("products");
    }

    deleteCart = (cid) => {
        return cartModel.findByIdAndDelete(cid);
    }
 
    addProductToCart = async (cid,pid) =>{
        const product = await productModel.findById(pid)

        if(!product) {
            console.log("Product not found")
        }
        const cart = await cartModel.findById(cid)
        if(!cart) {
            console.log("Cart not found")
        }

        cart.products.push(pid)

        await cart.save()
        return cart
    };
}
