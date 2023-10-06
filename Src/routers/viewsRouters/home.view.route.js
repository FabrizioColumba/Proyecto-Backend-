import RouterPadre from '../../routers/router.js'
import {productsService, userServices,cartsService} from '../../services/services.js'


export default class HomeViewRouter extends RouterPadre{
    init(){
        this.get('/home', ["USER","ADMIN","PREMIUM"], async (req,res)=>{
            try{
                const AllProducts = await productsService.getProducts()
                res.render('home', {
                    css:'home',
                    AllProducts: AllProducts           
                })
            }catch(err){
                return res.status(400).send(err)
            }  
        })

        this.get('/', ["PUBLIC"], async (req,res)=>{
            res.render('inicio')
        })

    }
}