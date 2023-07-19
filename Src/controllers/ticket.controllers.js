import productModel from "../dao/models/productsModel.js";
import TiketServices from "../services/ticketsServices.js";

const operacionTiket=async(req,res)=>{
    const userTiketInfo = req.userTiketInfo;
    const productsTiket= req.userTiketInfo.productsComprados
    
  //console.log('products tikets',productsTiket)
    const cambios = productsTiket.map(product => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.quantity } }
      }
    }))
    await productModel.bulkWrite(cambios)
    
    const producstWithStock= []
    const productsWithoutStock= []
    const productIds = productsTiket.map(product => product._id) 
    const productsDb = await productModel.find({ _id: { $in: productIds } })
    
    productsDb.forEach(p=>{
      const stock= p.stock
      if(stock > 0){
        //console.log('tiene stock')
        producstWithStock.push({...p})
       // console.log('productos con stock',producstWithStock)
      }
      else{
        console.log('Lo siento , no hay stock del producto')
        productsWithoutStock.push({...p})
      //  console.log('productos sin stock', productsWithoutStock)
      }
    })
    const sumoQuantity = productosConStock.reduce((total, producto) => total + producto._doc.quantity, 0)
      const sumoAmount = productosConStock.reduce((total, producto) => total + producto._doc.price, 0);
      const tiket= {
        buyerEmailTiket:userTiketInfo.useremail ,
        productsWithStock:producstWithStock ,
        productsWithoutStock:productsWithoutStock,
        totalQuantity:sumoQuantity,
        totalAmount:sumoAmount,
      }
    const result = await  TiketServices.createTiket(tiket)
    console.log('result de operacion product', result)
    res.send({status:'success', payload: result})
  }
  
  export default{
    operacionTiket
  }
