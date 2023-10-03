import RouterPadre from '../routers/router.js'
import {cartsService, productsService} from '../services/services.js'
import productsControllers from '../controllers/products.controllers.js'
import uploader from '../services/multerServices/uploader.js'
import {productsUploader} from  '../middlewares/multer.middleware.js'

export default class ProductRouter extends RouterPadre{
    init(){

        this.get('/',["PUBLIC","USER", "PREMIUM","ADMIN"],productsControllers.getProducts)    
     //   this.post('/deleteProduct',["ADMIN", "PREMIUM","USER"], productsControllers.deleteProductCart)   
        this.get('/:pid', ["PUBLIC"],productsControllers.getProduct )
        this.post('/newproduct',["ADMIN","PREMIUM"],productsUploader,productsControllers.postProduct)
        this.put('/',["ADMIN", "PREMIUM"],productsControllers.putProduct )
        this.delete('/deleteProduct/:pid',["ADMIN","PREMIUM"],productsControllers.deleteProduct)
        this.post('/addProductTocart', ["USER","PREMIUM"], productsControllers.addProductCart)
        this.post('/updateProductImg', ["ADMIN", "PREMIUM"],productsUploader,productsControllers.updateProductImg)

        this.put('/updateProduct',["ADMIN","PREMIUM"], productsControllers.putProduct)
    //esto es para cargarlos todos de una para mi
        this.post('/cargomuchos', ["PUBLIC"], async (req,res)=>{
        try{
        const products= req.body
        const result= await productsService.createProducts(products)
        res.send({status:"success", message:"productos agregados", payload: result})
        }
        catch(error){
        console.log(error)
       }
    })



    }//cierre del init
}