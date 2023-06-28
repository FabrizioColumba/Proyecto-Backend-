import BaseRouter from "./base.router.js";
import { passportCall } from "../middlewares/auth.js";
import CartManager from "../dao/mongo/managers/cartManager.js";


const cartsManager = new CartManager();

export default class CartRouter extends BaseRouter {
    init(){

        //Traigo los carrityos
       this.get("/", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            try {
                const carts = await cartsManager.getCart();
                res.send({ status:"success", playload: carts})
            } catch (error) {
                console.log(error)
            }
        
        })
        
        //Traigo un carrito por id
       this.get("/:cid", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
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
       this.post("/", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
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
       this.put("/:cid", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            const {cid} = req.body;
            const {products} = req.body;
            const cart = await cartsManager.updateCart(cid,products);
        })
        
        
        //agrega un producto al carrito
       this.put("/:cid/products/:pid", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
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
       this.delete("/:cid/products/:pid", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            try {
                const { pid } = req.params;
                const cart = cartsManager.deleteCart(pid);
                res.send({status:"success", playload:cart})
            } catch (error) {
                console.log(error)
            }
        });
        
        //Elimina todos los productos del carrito
       this.delete("/:cid", ['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async (req, res) => {
            try {
                const {cid , pid} = req.params;
                const cart = cartsManager.deleteProductInCart(cid,pid);
                res.send({status:"success", playload: cart});
                
            } catch (error) {
                console.log(error)
            }
        })
    }
}

