import {Router} from "express"
import ProductManager from "../dao/mongo/managers/ProductManager.js"; 

const router = Router();
const productManager = new ProductManager();


router.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("index", {prod : products})
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});

export default router;