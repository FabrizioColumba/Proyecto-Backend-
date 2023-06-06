
import express from "express";
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import { Server } from  "socket.io";

import __dirname from "./util.js";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

const app = express();
const connection = mongoose.connect("mongodb+srv://ecommerceCoder:123@clustercitofeliz.3f0s7ty.mongodb.net/EntregaFinal?retryWrites=true&w=majority")
const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, ()=>{console.log(`listening on PORT ${PORT}`)});


//Server de socket
const io = new Server(server);
//Lineas del poder y del saber
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${__dirname}/public`))
//Midleware IO
app.use((req,res,next)=>{
  req.io= io
  next()
})

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

//Routers
app.use("/api/carts",cartsRouter);
app.use("/api/products",productsRouter);
app.use("/",viewsRouter);

io.on('connection',socket=>{
  registerChatHandler(io,socket);
})

