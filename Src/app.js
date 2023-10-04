import express  from "express"; 
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express";


import passportStrategies from './config/passport.config.js'
import UserRouter from "./routers/user.router.js";
import SessionRouter from './routers/session.router.js'
import ProductRouter from './routers/products.router.js'
import CartRoute from './routers/cart.router.js'
import moksRouter from '../src/moks/routermoks/moks.products.router.js'
import loggerRouter from './routers/loggerRouter/logger.router.js'
import EmailRouter from './routers/email.router.js'
import DocumentsRouter from './routers/documents.router.js'
import UserViewRouter from './routers/viewsRouters/user.view.router.js'

import {loginAndRegisterview} from './services/viewsServices/viewsServices.js'
import {productsView} from './services/viewsServices/viewsServices.js'
import {cartView} from './services/viewsServices/viewsServices.js'
import {homeViewRouter} from './services/viewsServices/viewsServices.js'
import { Server } from 'socket.io'
import attachLogger from './middlewares/logger.middleware.js'
import errorHandler from './middlewares/errorMiddlewares.js'
import __dirname from "./util.js"
import config from './config.js'

const app= express()


app.use(attachLogger)
const port =config.app.PORT
const connection = mongoose.connect("mongodb+srv://ecommerceCoder:123@clustercitofeliz.3f0s7ty.mongodb.net/EntregaFinal?retryWrites=true&w=majority")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))

const server= app.listen(port, ()=> console.log(`listening on ${port} - ${config.mode.mode}`))
// const io  = new Server(server)
// app.use((req,res,next)=>{
//     req.io = io;
//     next();
// })
// io.on('connection', socket =>{
//     console.log("Nuevo cliente conectado");
   
// })


//handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')
passportStrategies()


const swaggerOptions={
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Tienda nube',
            description: 'Documentación de api ecommerce, proyecto para CorderHouse'
        }
    },
    apis: [ `${__dirname}/./docs/**/*.yaml`]
}

const specifications= swaggerJSDoc(swaggerOptions)
app.use('/docs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specifications))



//rutas
const documentsRouter= new DocumentsRouter()
app.use('/api/documents', documentsRouter.getRouter())
app.use('/', loggerRouter)
const userRouter= new UserRouter()
app.use('/api/users', userRouter.getRouter())
const sessionRouter= new SessionRouter()
app.use('/api/session', sessionRouter.getRouter())
const productsRouter= new ProductRouter()
app.use('/api/products', productsRouter.getRouter())
const cartRouter= new CartRoute()
app.use('/api/cart', cartRouter.getRouter())
const emailRouter= new EmailRouter()
app.use('/api/email', emailRouter.getRouter())

//rutas de vistas
app.use('/',loginAndRegisterview.getRouter())
app.use('/products',productsView.getRouter())
app.use('/',cartView.getRouter())
app.use('/', homeViewRouter.getRouter())
const useViewRouter= new UserViewRouter()
app.use('/users', useViewRouter.getRouter())
app.use('/smokingsproducts', moksRouter)

app.use(errorHandler)








