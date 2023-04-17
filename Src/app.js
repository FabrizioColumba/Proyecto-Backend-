import ProductManager from "./managers/ProductManager.js"
import express from "express";

const app = express();
const productManager = new ProductManager();

const products = productManager.getProducts();

app.get("/products/", async (req, res) => {
  const cantidadDeProductos = req.query.limit;
  const allProducts = await products;
  if (cantidadDeProductos) {
    const reduced = allProducts.slice(0, cantidadDeProductos);
    res.send(reduced);
  } else {
    res.send(allProducts);
  }
});

app.get(`/products/:pid`, async (req, res) => {
  const idProducts = req.params.pid;
  const allProducts = await products;
  const selected = allProducts.find((p) => p.id == idProducts);
  res.send(selected);
});

app.listen(8080, () => {
  console.log("servidor arribaa");
});
