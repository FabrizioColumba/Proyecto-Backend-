import { Router } from "express";
const router = Router();
import ProductManager from "../managers/ProductManager.js"
const productManager = new ProductManager;
const products = productManager.getProducts();
//Trae los productos y declarala cantidad que quiero mostar
router.get("/", async (req, res) => {
    const cantidadDeProductos = req.query.limit;
    const allProducts = await products;
    if (cantidadDeProductos) {
      const reduced = allProducts.slice(0, cantidadDeProductos);
      res.send(reduced);
    } else {
      res.send(allProducts);
    }
  });
//Seleciona x id el producto que quiere traer
router.get("/:pid", async (req, res) => {
    const idProducts = req.params.pid;
    const allProducts = await products;
    const selected = allProducts.find((p) => p.id == idProducts);
    res.send(selected);
});
//Agrega un nuevo producto
router.post("/", async (req, res) => {
  const product = req.body
  const productAdd = await productManager.addProduct(product);
  productAdd === undefined ? res.status(400).send() : res.status(201).send(productAdd);
});
//Toma un producto y lo actualiza
router.put("/:pid", async (req, res) => {
  try {
  const updatedProduct = req.body
  const productId = parseInt(req.params.pid)
  const productUpdate = await productManager.updateProduct(productId,updatedProduct)
  res.status(200).send(productUpdate)
} catch (error) {
  res.status(400).send({status:"error",message:"Product not found"})
  }
});
//Elimina un producto
router.delete("/", async (req,res) => {
  try {
    const productId = parseInt(req.params.pid)
    const productsDelete = await productManager.deleteProduct(productId)
    res.status(200).send({status:"success",message: `Product ID has been deleted`, products : productsDelete})
  }catch (err) {
    res.status(200).send({status:"error",message: `Product not found`}) 
  }

});


export default router;