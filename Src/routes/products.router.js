import { Router } from "express";
import ProductManager from "../dao/mongo/managers/productsManager.js"

const router = Router();
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
    const {pid} = req.params;
    const getProduct = await productManager.getProductsById({_id: pid});

    if(!getProduct) return res.status(404).send({status:"error", error:"Product not found"})
    res.send({status:"success", payload: getProduct});
    
  } catch (error) {
    console.log(error)
  }
});


//Agrega un nuevo producto
router.post("/", async (req, res) => {
  const {title, description, price, category, status} = req.body
  if(!title||!description||!price||!category) return res.status(400).send({status:"error", error:"Incompleted values"});
  const product = {
    title,
    description,
    price,
    category
  }
  const result = await productManager.createProduct(product);
  res.status(201).send("Product created");
});


//Toma un producto y lo actualiza
router.put("/:pid", async (req, res) => {
  try {
  const {pid} = req.params
  const updateProduct = req.body;
  const resutl = await productManager.updateProduct(pid,updateProduct);
  res.sendStatus(200)
} catch (error) {
  res.status(400).send({status:"error",message:"Product not found"})
  }
});


//Elimina un producto
router.delete("/:pid", async (req,res) => {
  try {
   const {pid} = req.params;
    const productsDelete = await productManager.deleteProduct(pid)
    res.status(200).send({status:"success",message: `Product ID has been deleted`, products : productsDelete})
  }catch (err) {
    res.status(200).send({status:"error",message: `Product not found`}) 
  }
});


router.post("/realtimeproducts", async (req, res) => {
  try{
    const {title, description, price, category}= req.body
    if(!title || !description || !price || !category) return res.status(400).send({status: "error", error: "Incompleted values"})
    const product= {
        title,
        description,
        price,
        category
    }
    const result= await productManager.createProduct(product)
    res.sendStatus(201)

    const allProducts= await productsService.getProducts()
    req.io.emit('productRealTime', allProducts)
}
catch(err){
    console.log(err)
}})

export default router;