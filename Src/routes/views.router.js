import {Router} from "express"
import ProductManager from "../managers/ProductManager.js"; 

const router = Router();
const productManager = new ProductManager();


router.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("index", {prod : products})
})

router.get("/realTimeProducts", async (req, res) => {
     //productos harcodeados
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {products});
});

router.post("", async (req, res) => {

});

export default router;