import { Router } from "express";
import { generateMoksProducts } from "../productsMoks/products.moks.js";


const router = Router();

router.get('/', async (req,res)=>{
    try{
        const arrayProductsMoks= []
        for(let i=0; i<50; i++){
            arrayProductsMoks.push(generateMoksProducts())
            console.log('productos del mock', arrayProductsMoks)
        }
        res.send({status:'success', payload:arrayProductsMoks ,message:'moks de productos generados'})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/moks', async (req,res)=>{
  
    try{
 
     const product = generateMoksProducts()
     console.log(product)
        res.send({status:'success', payload:product})
    }
    catch(error){
        console.log(error)
    }
})

export default router