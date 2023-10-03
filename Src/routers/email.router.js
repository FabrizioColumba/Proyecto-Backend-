import RouterPadre from "./router.js";
import Dtemplates from '../constants/Dtemplates.js'
import MailingService from '../mailService/mail.service.js'

const mailingService= new MailingService()

export default class EmailRouter extends RouterPadre{
    init(){

            this.get('/',['PUBLIC'], async (req,res)=>{
                try{
                const result= await mailingService.sendMail('mtgprimaria@gmail.com', Dtemplates.RESTORE_PASSW,{msj:'Hola,funciona'})

                res.send({status:"success",payload:result})
                }
                catch(error){
                    console.log(error)
                }
            })

    }//cierre init
}