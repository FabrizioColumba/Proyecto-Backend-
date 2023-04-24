import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use("/api/carts",cartsRouter);
app.use("/api/products",productsRouter);



app.listen(8080, () => {
  console.log("servidor arribaa");
}); 