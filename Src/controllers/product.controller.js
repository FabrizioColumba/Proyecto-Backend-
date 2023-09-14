import { cartServices, productServices } from "../services/services.js";
import ErrorsService from "../services/errorServices.js";
import {productsErrorIncompleteValues, productsExistYet} from '../constants/productsErrors.js'
import {DicionarioEErrorProducts} from '../constants/Errors.js'


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
        console.log(req.body)
        const product = {
            pid:pid,
            productQuantity:productQuantity
        }
        const productStock= await productServices.getProduct(pid)
        if (productStock.stock < 0){
            ErrorsService.createError({
                name:"Error al agregar producto producto",
                cause: productsWithoutStock(productStock),
                code: DicionarioEErrorProducts.SIN_STOCK_INIXISTENTE,
                status:400

            }),
            req.logger.error(`producto agregado, sin stock ${productStock}`)
        }

        const result= await cartServices.addProductToCart(cid,product)
        console.log(result)

    res.send({status:"success", 
              message:`se agrego el product ${pid} en el el carrito ${cid} de ${username}`,
              payload:result})
    }
    catch(error){
        console.log(error)
    }
}
const deleteProductCart = async(req,res)=>{
    try{
        const user = req.user;
    const cid = user.cart[0]._id
    console.log('cart id', cid)
    const pid= req.body.pid
    console.log('pid', pid)

    const result= await cartServices.subtractProduct(cid,pid)
    res.send({status:'success',payload:result })
    }
    catch(error){
        console.log(error)
    }
}

const postProduct= async(req,res)=>{
    try{
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        if(!title || !description || !price || !category || !code || !img){
            ErrorsService.createError({
                name:"Error al crear producto",
                cause: productsErrorIncompleteValues({title,description,price,code,img}),
                code: DicionarioEErrorProducts.INCOMPLETE_VALUES,
                status:400

            })
        }
        const addProduct= await productServices.createProduct(product)
        res.send({status:'success', message:`Se creó el producto ${product.description}`,payload:addProduct})
    }
    catch(error){
        console.log(error)
    }
}

const deleteProduct=async(req,res)=>{
    const {pid}= req.params
    const deleteProduct= await productServices.deleteProduct(pid)
    res.send({status:'success', message: 'Producto eliminado'})
}


const putProduct=async(req,res)=>{
    try{
        const {pid}=req.params
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        const updateProduct= await productServices.updateProduct(pid,product)
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