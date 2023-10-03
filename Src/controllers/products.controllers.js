import {cartsService, productsService} from '../services/services.js'
import ErrorsService from '../services/ErrorServices/error.services.js'
import {productsErrorIncompleteValues, productsExistYet} from '../constants/productsErrors.js'
import {DictionaryEErrorProducts} from '../constants/EErors.js'
import MailingService from '../mailService/mail.service.js'
import Dtemplates from '../constants/Dtemplates.js'
import config from '../config.js'

const port =config.app.PORT
const urlDeploy= ''

const getProducts=async(req,res)=>{
    try{
        const products= await productsService.getProducts()
        res.send({status: "success", payload:products})
    }
    catch(error){
        console.log('Error catch get products:', error)
    }
}


const getProduct= async(req,res)=>{
    try{
        const {pid}=req.params
        const product= await productsService.getProductById(pid)
        res.send({status:'success', payload: product})
    }
    catch(error){
        console.log('Error catch get product:', error)
    }
}



const addProductCart=async (req,res)=>{
    try{
        

        const cid= req.user.cart[0]._id
        const username= req.user.name
        const pid= req.body.productId  
       
        const productQuantity= req.body.spamQuantity
        const product= {
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
                code: DictionaryEErrorProducts.SIN_STOCK_INIXISTENTE,
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




const deleteProductCart= async(req,res)=>{
    try{
    const user = req.user;
    const cid = user.cart[0]._id
    const pid= req.body.pid
    const result= await cartsService.subtractProduct(cid,pid)
    res.send({status:'success',payload:result })
   
    }
    catch(error){
        console.log('Error catch delete product:', error)
    }
}




const postProduct= async(req,res)=>{
    try{
        const useremail= req.user.email 
        const{title,description,price,category,code,stock,talle,color}=req.body
         if(!title || !description || !price || !category ){
            ErrorsService.createError({
                name:"Error al crear producto",
                cause: productsErrorIncompleteValues({title,description,price,code,img}),
                code: DictionaryEErrorProducts.INCOMPLETE_VALUES,
                status:400
            })
        } 
        const imgFileName=req.file.filename  
    
        const product= {
            title,
            description,
            price,
            category,
            code,
            stock,
            img: `${urlDeploy}/api/documents/${imgFileName}?folder=products`,
            talle,
            color,
            owner:useremail
        }
 
       const addProduct= await productsService.createProduct(product)
        res.send({status:'success', payload: addProduct})        
      
    }
    catch(error){
       console.log('Error catch createProduct:', error)
    }
}

const deleteProduct=async(req,res)=>{
    const {pid}= req.params
    const product= await productsService.getProductById(pid)
    const email= product.owner
    const productDescription = product.description
    const mailingService= new MailingService()
    const result= await mailingService.sendMail([email,req.user.email,'mtgprimaria@gmail.com'], Dtemplates.DELETE_PRODUCT,productDescription)

    const deleteProduct= await productsService.deleteProduct(pid)
    res.send({status:'success', message: 'Producto eliminado'})
}

const putProduct=async(req,res)=>{
    try{
      const pid= req.body.productId
      const productDb=await productsService.getProductById(pid)
      const updatedProduct = {
        title: req.body.title || productDb.title,
        description: req.body.description || productDb.description,
        price: req.body.price || productDb.price,
        category: req.body.category || productDb.category,
        code: req.body.code || productDb.code,
        talle: req.body.talle || productDb.talle,
        color: req.body.color || productDb.color,
        stock: req.body.stock || productDb.stock,
        img:productDb.img
    }
 
      const updateProduct= await productsService.updateProduct(pid,updatedProduct)
      res.send({status:'success', message:'Producto modificado', payload:updateProduct})
    }
    catch(error) {
        req.logger.error('Error catch updateProduct:', error)
    }
}

export default{
    getProducts,
    getProduct,
    addProductCart,
    postProduct,
    putProduct,
    deleteProductCart,
    deleteProduct,
}