import BaseRouter from "./base.router.js"
import path from 'path'
import __dirname from "../util.js"
import fs from 'fs'

export default class DocumentsRouter extends BaseRouter{
    init(){

        this.get('/:filename',["USER", "PREMIUM","ADMIN"],async (req,res)=>{
           try{
            
           
             const {filename}= req.params
             const { folder } = req.query || 'img'
             const pathIMG= path.resolve(`${__dirname}/public/files/${folder}/${filename}`)
             const exist=  fs.existsSync(pathIMG)
             if(exist){
                 res.sendFile(pathIMG)
             }
             else{
                 res.send({status:'error', error: 'Documento no encontrado en el servidor'})
             }
           }
           catch(error){
            console.log(error)
           }
        })


    }
}