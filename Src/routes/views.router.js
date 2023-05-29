import {Router} from "express"
import ProductManager from "../dao/mongo/managers/productsManager.js"
import CartManager from "../dao/mongo/managers/cartManager.js";
import productModel from "../dao/mongo/models/productsModel.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

 //trae todos los productos o por categoria
router.get("/products", async (req, res) => {
    const { page= 1, category, limit: queryLimit} = req.query;

    const defaultLimit = 3
    const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit  : defaultLimit

    const {cid} = req.params;
    if (!cid) {
        const newCart = await cartManager.createCart();
        const cid= newCart.cid;
    }

    if(category) {
        const productsFilter = await productModel.find({category: category}).lean();
        res.render("products", {
            products: productsFilter,
            hasPrevPage: false,
            hasNextPage: false,
            cid: cid
        })
    }else{
        const {docs, totalPages, page:currentPage} = await productModel.paginate({}, {page,limit,lean:tue})
        const products = docs

        const hasNextPage = currentPage < totalPages;
        const hasPrevPage = currentPage > 1;
        const prevPage = hasPrevPage ? currentPage -1 : null;
        const nextPage = hasNextPage ? currentPage + 1 : null;

        req.render("products", 
        {products,
            page:currentPage,
            hasNextPage,
            hasPrevPage,
            prevPage,
            nextPage,
            cid:cid

        })

    }
})
//RealTimeProducts
router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});
//Chat
router.get('/chat', async(req,res)=>{
    res.render('chat')
})
//Vista del carrito
router.get('/carts/:cid', async(req,res) => {
    const {cid} = req.params;

    const cart = await cartManager.getCartById(cid);
    res.render("cart", {cart})
})

export default router;