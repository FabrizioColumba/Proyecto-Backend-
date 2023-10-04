import RouterPadre from '../routers/router.js'
import {cartsService, productsService} from '../services/services.js'
import productsControllers from '../controllers/products.controllers.js'
import uploader from '../services/multerServices/uploader.js'
import {productsUploader} from  '../middlewares/multer.middleware.js'

export default class ProductRouter extends RouterPadre{
    init(){

        this.get('/',["PUBLIC","USER", "PREMIUM","ADMIN"],productsControllers.getProducts)    
       
        this.get('/:pid', ["PUBLIC"],productsControllers.getProduct )
       
        this.post('/newproduct',["ADMIN","PREMIUM"],productsUploader,productsControllers.postProduct)
       
        this.put('/',["ADMIN", "PREMIUM"],productsControllers.putProduct )
        
        this.delete('/deleteProduct/:pid',["ADMIN","PREMIUM"],productsControllers.deleteProduct)
        
        this.post('/addProductTocart', ["USER","PREMIUM"], productsControllers.addProductCart)
        
        this.put('/updateProduct',["ADMIN","PREMIUM"], productsControllers.putProduct)
    }
}