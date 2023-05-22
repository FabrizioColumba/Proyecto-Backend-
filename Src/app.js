import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import usersRouter from "./routes/users.router.js"
//import ProductManager from "./managers/ProductManager.js";
import __dirname from "./util.js";
import { Server } from  "socket.io";

const app = express();
const connection = mongoose.connect("mongodb+srv://ecommerce:central98@cluster0.6btx7wf.mongodb.net/ERPSystem?retryWrites=true&w=majority")
const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, ()=>{console.log(`listening on PORT ${PORT}`)});


//const productManager = new ProductManager();

//Server de socket
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${__dirname}/public`))

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


//Midleware IO
app.use((req, res, next) => {
  req.io = io;
  next();
});

//Routers
app.use("/api/carts",cartsRouter);
app.use("/api/products",productsRouter);
app.use("/",viewsRouter);
app.use("/api/users",usersRouter);

io.on("connection", async socket => {
  console.log("new client connected");
  socket.on("click", data =>{
      socket.emit("sendProducts", products);
  })
});

