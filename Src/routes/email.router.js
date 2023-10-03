import BaseRouter from "./base.router.js";
import Dtemplates from '../constants/Dtemplates.js'
import MailingService from "../services/MailServices/mail.js";

const mailingService = new MailingService()

export default class EmailRouter extends BaseRouter{
    init(){

            this.get('/',['PUBLIC'], async (req,res)=>{
                try{
                const result= await mailingService.sendMail('fabriziocolumba@gmail.com', Dtemplates.RESTORE_PASSW,{msj:'Hola rabia'})

                res.send({status:"success",payload:result})
                }
                catch(error){
                    console.log(error)
                }
            })

    }
}