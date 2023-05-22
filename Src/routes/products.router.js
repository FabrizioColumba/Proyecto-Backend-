import { Router } from "express";
const router = Router();
import ProductManager from "../dao/mongo/managers/ProductManager.js";
const productManager = new ProductManager;
//Trae los productos y declarala cantidad que quiero mostar
router.get("/", async (req, res) => {
    const cantidadDeProductos = req.query.limit;
    const allProducts = await productManager.getProducts();
    console.log("AllProducts: ",allProducts);
    if (cantidadDeProductos) {
      const reduced = allProducts.slice(0, cantidadDeProductos);
      res.send(reduced);
    } else {
      res.send(allProducts);
    }
  });
//Seleciona x id el producto que quiere traer
router.get("/:pid", async (req, res) => {
  try { 
    const idProducts = req.params.pid;
    console.log(idProducts)
    const getProduct = await productManager.getProductsById(idProducts);
    console.log(getProduct)
    res.send(getProduct);
    
  } catch (error) {
    console.log("Not found")
  }
   
});
//Agrega un nuevo producto
router.post("/", async (req, res) => {
  const product = req.body
  const productAdd = await productManager.addProduct(product);
  res.status(201).send("Product add");

});
//Toma un producto y lo actualiza
router.put("/:pid", async (req, res) => {
  try {
  const updatedProduct = req.body
  const productId = parseInt(req.params.pid)
  const productUpdate = await productManager.updateProduct(productId,updatedProduct)
  res.status(200).send(productUpdate);
} catch (error) {
  res.status(400).send({status:"error",message:"Product not found"})
  }
});
//Elimina un producto
router.delete("/:pid", async (req,res) => {
  try {
    const productId = parseInt(req.params.pid)
    const productsDelete = await productManager.deleteProduct(productId)
    res.status(200).send({status:"success",message: `Product ID has been deleted`, products : productsDelete})
  }catch (err) {
    res.status(200).send({status:"error",message: `Product not found`}) 
  }

});
router.post("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts(); 
  const product = req.body; 
  if (products.length === 0) {
      product.id = 1;
  } else {
      product.id = products[products.length - 1].id + 1;
  }

  if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
    return res.send({status:"Error", message:"todos los campos son obligatorios"});
  }

  product.code = parseInt(product.code);

  const validationCode = products.some(e => e.code === product.code);

  if(validationCode){        
      res.send({status:"Error", message:"Código ya ingresado"})
  }else{        
  products.push(product);
  console.log(products)
  await productManager.addProduct(product)
  req.io.emit("products", products);
  res.send("ok");
  }})

export default router;