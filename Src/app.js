import express from "express";
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import { Server } from  "socket.io";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


import CartRouter from "./routes/carts.router.js"
import ProductRouter from "./routes/products.router.js";
import SessionRouter from "./routes/session.router.js";
import UserRouter from "./routes/userView.router.js";
import EmailRouter from "./routes/email.router.js";
import DocumentsRouter from "./routes/documents.router.js";
import loggerRouter from "./routes/loggerRouter/logger.router.js"
import initializePassportStrategies from './config/passport.config.js';
import moksRouter from "./moks/routerMoks/moks.products.router.js"
import UserView from "./routes/viewsRouter/userView.router.js";
import { loginAndRegisterview } from "./services/viewsServices.js";
import {productsView} from './services/viewsServices.js'
import {cartView} from './services/viewsServices.js'
import {homeView} from './services/viewsServices.js'

import errorMiddlewares from "./middlewares/errorMiddlewares.js";
import config from "./config.js"
import __dirname from "./util.js";


const app = express();
const connection = mongoose.connect("mongodb+srv://ecommerceCoder:123@clustercitofeliz.3f0s7ty.mongodb.net/modulo2?retryWrites=true&w=majority")
const PORT = process.env.PORT || 8080; 
const server = app.listen(PORT, ()=>{console.log(`listening on PORT ${PORT}`)});


//Server de socket
const io = new Server(server);
app.use(cookieParser())
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

app.use(session({
  store: new MongoStore({
      mongoUrl: "mongodb+srv://ecommerceCoder:123@clustercitofeliz.3f0s7ty.mongodb.net/EntregaFinal?retryWrites=true&w=majority",
      ttl: 20
  }),
  secret: 'CoderS3cret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
initializePassportStrategies();


const swaggerOptions={
  definition:{
      openapi: '3.0.1',
      info:{
          title: 'Tecno Tienda Gamer',
          description: 'Tienda de componentes gamers .'
      }
  },
  apis: [ `${__dirname}/./docs/**/*.yaml`]
}

const specifications= swaggerJSDoc(swaggerOptions)
app.use('/docs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specifications))


//Routers
const documentsRouter = new DocumentsRouter()
app.use('/api/documents', documentsRouter.getRouter())
app.use('/', loggerRouter)
const userRouter = new UserRouter()
app.use('/api/users', userRouter.getRouter())
const cartRouter = new CartRouter()
app.use("/api/cart",cartRouter.getRouter())
const productsRouter= new ProductRouter()
app.use("/api/products",productsRouter.getRouter());
const sessionRouter= new SessionRouter()
app.use('/api/session', sessionRouter.getRouter());
const emailRouter= new EmailRouter()
app.use('/api/email', emailRouter.getRouter())
app.use('/smokingsproducts', moksRouter)

io.on('connection',socket=>{
  registerChatHandler(io,socket);
})
app.use('/',loginAndRegisterview.getRouter())
app.use('/products',productsView.getRouter())
app.use('/',cartView.getRouter())
app.use('/', homeView.getRouter())
const userViewRouter = new UserView()
app.use('/users', userViewRouter.getRouter())