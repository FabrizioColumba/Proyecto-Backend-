import express from "express";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";
import __dirname from "./util.js";
import { Server } from  "socket.io";

const app = express();
const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, ()=>{console.log(`listening on PORT ${PORT}`)});


const productManager = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${__dirname}/public`))

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/carts",cartsRouter);
app.use("/api/products",productsRouter);
app.use("/",viewsRouter);
app.use((req,res,next)=>{
    req
})


const io = new Server(server);

io.on("connection", async socket => {
  console.log("new client connected");
  const products = await productManager.getProducts();
  socket.on("products", data =>{
      socket.emit("sendProducts", products);
  })
});

