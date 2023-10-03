import RouterPadre from '../router.js'
import {cartsService, productsService,tiketService,userServices} from '../../services/services.js'
import productsModel from '../../dao/models/productsModel.js'
import {generateTiketsData} from '../../middlewares/tiket.middleware.js'


export default class CartView extends RouterPadre{
    init(){
      

        this.get('/cart', ["USER", "PREMIUM"], async (req,res)=>{
          // console.log(`el dueño de este carrito es ${req.user.name}`)
          const username= req.user.name
          const cart= req.user.cart 
         
          const cid= cart[0]._id
          //const clear= await cartsService.clearCart(cid)
         const cartDb= await cartsService.getCartById(cid)
        // console.log(cartDb.products)
        let listFinalDeProducts=[]
        const integro= cartDb.products.map(p=>{
          const obj={
            id: p.product._id,
            description: p.product.description,
            price: p.product.price,
            img: p.product.img,
            category: p.product.category,
            talle: p.product.talle,
            color:p.product.color,
            amount: p.amount,
            quantity: p.quantity
          }

         listFinalDeProducts.push(obj)
        })

         
          res.render('cart',{
            cid:cid,
            listFinalDeProducts:listFinalDeProducts,
            totalAmount: cartDb.totalAmount,
            totalQuantity:  cartDb.totalQuantity,
            username:username
          })
       })






        this.get('/:cid/purchase', ["ADMIN",'USER',"PREMIUM"], generateTiketsData, async (req, res) => {
            const email= req.user.email
            const tiketDb= await tiketService.getTiket("purchaser", email)
              
            const tiket={
              code: tiketDb.code,
              totalQuantity: tiketDb.totalQuantity,
              amount: tiketDb.amount,
              purchaser:tiketDb.purchaser,
              dataTime: tiketDb.created_at
            }
            console.log(tiket)
               res.render('tiketcompra',{
              tiket:tiket
            })
              });

             this.get('/soketCart', ["USER","PREMIUM"], async(req,res)=>{
              res.render('pruebasoket')
             })

    }//cierre del init
}

