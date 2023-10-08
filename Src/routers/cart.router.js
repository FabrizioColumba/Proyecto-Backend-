import RouterPadre from './router.js'
import cartControllers from '../controllers/cart.controllers.js'
import productsCntrolles from '../controllers/products.controllers.js'
import tiketControllers from '../controllers/tiket.controllers.js'
import { generateTiketsData} from '../middlewares/tiket.middleware.js'

export default class CartRoute extends RouterPadre{
    init(){
        
        this.get('/',["PUBLIC","USER","PREMIUM"], cartControllers.getUserCart)
       
        this.post('/deleteproductcart', ["PUBLIC",'USER',"PREMIUM"],productsCntrolles.deleteProductCart)
        
        this.post('/clearCart', ["PUBLIC","USER","PREMIUM"],cartControllers.clearCart )
        
        this.post('/:cid/purchase', ["PUBLIC",'USER',"PREMIUM"], tiketControllers.operacionTiket)
        
        this.get('/clearTiketAndCart/:cid/:tid',["PUBLIC"], tiketControllers.clearTiketAndCart)
    }

}
