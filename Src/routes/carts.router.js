import { Router } from "express";
import CartManager from "../managers/CartManager.js"
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const cartsManager = new CartManager();
const productManager = new ProductManager();

//Lista los productos con el id
router.get("/:cid", async (req, res) => {
    try {
        const idCart = parseInt(req.params.cid)
        const allCarts = await cartsManager.getCartsById(idCart);
        res.send(allCarts)
    } catch (error) {
        console.log(error);
        return res.status(404).send({status: "error", message:"Not Found"});
    }
});


//Crea el carrito
router.post("/", async (req, res) => {
    try {
        await cartsManager.createCart();
        res.send("Cart created successfully")
    } catch (error) {
        console.log(error)
        return res.status(404).send({status: "error", message:"Cart not created"});
    }
});
//agrega un producto al arreglo "products"
router.post("/:cid/products/:pid", async (req, res) => {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const {quantity} = req.body;
        const allCarts = await cartsManager.addProductInCart(idCart, idProduct, quantity);
        res.status(201).send(allCarts);
});

export default router;