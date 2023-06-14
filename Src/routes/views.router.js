import {Router} from "express"
import ProductManager from "../dao/mongo/managers/productsManager.js"
import CartManager from "../dao/mongo/managers/cartManager.js";
import { privacy } from "../middlewares/auth.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

 //vista de productos
router.get("/products", privacy("PRIVATE"), async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productManager.getProduct(page, limit);
    res.render("products", { docs, page: rest.page, hasPrevPage, hasNextPage, prevPage, nextPage, limit, user: req.session.user })
})

//RealTimeProducts
router.get("/realtimeproducts",privacy("PRIVATE"), async (req, res) => {
    res.render("realTimeProducts");
});
//Chat
router.get('/chat',privacy("PRIVATE"), async(req,res)=>{
    res.render('chat')
})
//register
router.get('/register',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('register');
})

router.get('/login',privacy('NO_AUTHENTICATED'),(req,res)=>{
    res.render('login')
})
router.get('/profile',privacy('PRIVATE'),(req,res)=>{
    res.render('profile',{
        user:req.session.user
    })
})
//Vista del carrito
router.get('/carts/:cid', async(req,res) => {
    const {cid} = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        res.render("cart", {cart})
    } catch (error) {
        res.render("error")
    }
})

export default router;