import { Router } from "express";
import CartManager from "../dao/mongo/managers/cartManager.js";

const router = Router();
const cartsManager = new CartManager();


//Traigo los carrityos
router.get("/", async (req, res) => {
    try {
        const carts = await cartsManager.getCart();
        res.send({ status:"success", playload: carts})
    } catch (error) {
        console.log(error)
    }

})

//Traigo un carrito por id
router.get("/:cid", async (req, res) => {
    try {
        const {cid} = req.params.cid;
        const carts = await cartsManager.getCartsById(cid);
        res.send({status:"success", playload:carts})
    } catch (error) {
        console.log(error);
        return res.status(404).send({status: "error", message:"Not Found"});
    }
});


//Crea el carrito
router.post("/", async (req, res) => {
    try {
        const {cart} = req.body;
        const newCart = await cartsManager.createCart();
        res.send({status:"success", playload: newCart});
    } catch (error) {
        console.log(error)
        return res.status(404).send({status: "error", message:"Cart not created"});
    }
});

//Actualiza el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
    const {cid} = req.body;
    const {products} = req.body;
    const cart = await cartsManager.updateCart(cid,products);
})


//agrega un producto al carrito
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const {quantity} = req.body;
        const carts= await cartsManager.addProductInCart(cid, pid, quantity);
        console.log(JSON.stringify(carts,null, '\t'))
        res.status({status:"success", playload:carts})
        
    } catch (error) {
        console.log(error)
    }
});


//Elimina un producto del carrito x id
router.delete("/:cid/products/:pid", async (req,res) =>{
    try {
        const { pid } = req.params;
        const cart = cartsManager.deleteCart(pid);
        res.send({status:"success", playload:cart})
    } catch (error) {
        console.log(error)
    }
});

//Elimina todos los productos del carrito
router.delete("/:cid", async (req, res) =>{
    try {
        const {cid , pid} = req.params;
        const cart = cartsManager.deleteProductInCart(cid,pid);
        res.send({status:"success", playload: cart});
        
    } catch (error) {
        console.log(error)
    }
})

export default router;