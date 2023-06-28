import BaseRouter from "./base.router.js";
import { passportCall } from "../middlewares/auth.js";
import ProductManager from "../dao/mongo/managers/productsManager.js"
import CartManager from "../dao/mongo/managers/cartManager.js";
import { privacy } from "../middlewares/auth.js";

const productManager = new ProductManager();
const cartManager = new CartManager();

export default class ViewsRouter extends BaseRouter{
    init(){

        //vista de productos
       this.get("/products",['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), privacy("PRIVATE"), async (req, res) => {
           const { page = 1, limit = 10 } = req.query;
           const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productManager.getProduct(page, limit);
           res.render("products", { docs, page: rest.page, hasPrevPage, hasNextPage, prevPage, nextPage, limit, user: req.session.user })
       })
       
       //RealTimeProducts
       this.get("/realtimeproducts",['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), privacy("PRIVATE"), async (req, res) => {
           res.render("realTimeProducts");
       });
       //Chat
       this.get('/chat',['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), privacy("PRIVATE"), async(req,res)=>{
           res.render('chat')
       })
       //register
       this.get('/register',['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), privacy('NO_AUTHENTICATED'),(req,res)=>{
           res.render('register');
       })
       
       this.get('/login',['AUTH'], passportCall('jwt', {strategyType: 'jwt'}),privacy('NO_AUTHENTICATED'),(req,res)=>{
           res.render('login')
       })
       this.get('/profile',['AUTH'], passportCall('jwt', {strategyType: 'jwt'}),privacy('PRIVATE'),(req,res)=>{
           res.render('profile',{
               user:req.session.user
           })
       })
       //Vista del carrito
       this.get('/carts/:cid',['AUTH'], passportCall('jwt', {strategyType: 'jwt'}), async(req,res) => {
           const {cid} = req.params;
           try {
               const cart = await cartManager.getCartById(cid);
               res.render("cart", {cart})
           } catch (error) {
               res.render("error")
           }
       })
    }
}
