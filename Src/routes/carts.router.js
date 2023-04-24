import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const cartsManager = new CartManager();
const productManager = new ProductManager();

const carts = cartsManager.getCarts();
const products = productManager.getProducts();
//Lista los productos con el id
router.get("/:cid", async (req, res) => {
    try {
        const idCart = req.params.cid;
        const allCarts = await carts;
        const cartSelected = allCarts.find(c => c.id === idCart)
        res.send(cartSelected)
    } catch (error) {
        console.log(error);
        return res.status(404).send({status: "error", message:"Not Found"});
    }
});
//Crea el carrito
router.post("/", async (req, res) => {
    try {
        cartsManager.createCart();
        res.send("Cart created successfully")
    } catch (error) {
        console.log(first)
        return res.status(404).send({status: "error", message:"Cart not created"});
    }
});
//agrega un producto al arreglo "products"
router.post("/:cid/products/:pid", async (req, res) => {
        const allCarts = await carts;
        const idCart = req.params.cid;
        const CartExist = allCarts.find((c) => c.id == idCart);
        if (!CartExist) {
          return res.status(404).send({ status: "error", error: "Cart not found" });
        }
        const idProduct = req.params.pid;
        let quantity = req.body.quantity;
        quantity ? (quantity = quantity) : (quantity = 1);
        const allProducts = await products;
        const productSelected = allProducts.find((p) => p.id == idProduct);
        if (productSelected) {
             res.send({ status: "succes ", code: "Product and Cart found" })
        } else {
            res.send("Product not found");
        }
        const productSelectedId = productSelected.id;
        const cartToSend = {
          product: productSelectedId,
          quantity: quantity,
        };
        cartsManager.addProductToCart(idCart, cartToSend);
});

export default router;