import RouterPadre from '../router.js'
import {ventasService} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'
import {generateTiketsData} from '../../middlewares/tiket.middleware.js'


export default class VentasViewRouter extends RouterPadre{
    init(){
       
        this.get('/all', ["PUBLIC"], async (req,res)=>{
            const ventas= await ventasService.getVentas()
            const ventasArray= []
            ventas.forEach(v => {
                const productsArray=[]
                v.products.forEach(p=>{
                    const obj={
                        description:p.description,
                        quantity: p.quantity,
                        price: p.price,
                        owner:p.owner,
                        fecha: p.fecha
                    }
                    productsArray.push(obj)

                })
               // console.log(productsArray)
                const venta={
                    comprador: v.comprador,
                    products: productsArray,
                    totalAmount: v.totalAmount,
                    fecha: v.fecha.toLocaleString()
                }
                ventasArray.push(venta)
            });
            
            res.render('ventas',{
                ventas: ventasArray
            })
        })
             

    }//cierre del init
}