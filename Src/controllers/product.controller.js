import { cartServices, productServices } from "../services/services.js";
import ErrorsService from "../services/errorServices.js";
import {productsErrorIncompleteValues, productsExistYet} from '../constants/productsErrors.js'
import {DicionarioEErrorProducts} from '../constants/Errors.js'
import MailingService from "../services/MailServices/mail.js";
import Dtemplates from "../constants/Dtemplates.js";
import config from "../config.js";

const port = config.app.PORT
const urlDeploy = ""

const getProducts=async(req,res)=>{
    try{
        const products= await productServices.getProducts()
        res.send({status: "success", payload:products})
    }
    catch(err){
        console.log(err)
    }

}

const getProduct= async(req,res)=>{
    try{
        const {pid}=req.params
        const product= await productServices.getProductBy("_id",pid)
        res.send({status:'success', payload: product})
        }
        catch(error){
            console.log(error)
        }
}


const addProductCart=async (req,res)=>{
    try{
          
        const cid = req.user.cart[0]._id
        const username = req.user.name
        const pid = req.body.productId

        const productQuantity= req.body.spamQuantity
        const product = {
            pid:pid,
            productQuantity:productQuantity
        }
        const productdB= await productsService.getProductById(pid)
           const productOwner= productdB.owner
           const email= req.user.email
           if(productOwner === email){
            res.send({status:'error', error: 'producto del usuario'})
           }
           if (productdB.stock < 0){
               ErrorsService.createError({
                   name:"Error al agregar producto producto",
                   cause: productsWithoutStock(productdB),
                   code: DicionarioEErrorProducts.SIN_STOCK_INIXISTENTE,
                   status:400
               }),
               req.logger.error(`producto agregado, sin stock ${productdB}`)
               res.send({status:'error', error: 'Producto sin stock'})
           }      
   
   
              const result= await cartsService.addProductToCart(cid,product)
              const cartDb= await cartsService.getCartById(cid)
              const totalQuantity= cartDb.totalQuantity
               req.io.emit('cartquantity',totalQuantity)
               res.send({status:"success" })
       }
       catch(error){
           console.log(error)
       }
   }
const deleteProductCart = async(req,res)=>{
    try{
        const user = req.user;
    const cid = user.cart[0]._id
    const pid= req.body.pid
    const result= await cartServices.subtractProduct(cid,pid)
    res.send({status:'success',payload:result })
    }
    catch(error){
        console.log(error)
    }
}

const postProduct= async(req,res)=>{
    try{
        const useremail= req.user.email 
        const {title, description,price,category,code,img}=req.body
        if(!title || !description || !price || !category || !code || !img){
            ErrorsService.createError({
                name:"Error al crear producto",
                cause: productsErrorIncompleteValues({title,description,price,code,img}),
                code: DicionarioEErrorProducts.INCOMPLETE_VALUES,
                status:400
                
            })
        }
        const imgFileName=req.file.filename  
        const product={
            title,
            description,
            price,
            category,
            code,
            img: `${urlDeploy}/api/documents/${imgFileName}?folder=products`,
        }
        const addProduct= await productServices.createProduct(product)
        res.send({status:'success', message:`Se creó el producto ${product.description}`,payload:addProduct})
    }
    catch(error){
        console.log(error)
    }
}

const deleteProduct=async(req,res)=>{
    const {pid} = req.params
    const product = await productServices.deleteProduct(pid)
    const emai = product.owner
    const productDescription = product.description
    const mailingService = new MailingService()
    const result = await mailingService.sendMail([email,req.user.email,'mtgprimaria@gmail.com'], Dtemplates.DELETE_PRODUCT,productDescription)

    const deleteProduct = await productServices.deleteProduct(pid)
    res.send({status:'success', message: 'Producto eliminado'})
}

const putProduct = async(req,res)=>{
    try{
        const {pid} = req.params
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        const updateProduct = await productServices.updateProduct(pid,product)
        res.send({status:'success', message:`Se modificó ${product.description}`, payload:updateProduct})
    }
    catch(error) {
        console.log(error)
    }
}

export default{
    getProducts,
    getProduct,
    addProductCart,
    postProduct,
    putProduct,
    deleteProductCart,
    deleteProduct
}