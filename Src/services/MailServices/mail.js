import nodemailer from "nodemailer"
import config from "../../config.js"
import DmailInfo from "../../constants/DmailInfo.js"
import { generateMailTemplate } from "../../util.js"

export default class MailingService{
    constructor(){
        this.mailer = nodemailer.createTransport({
            service:'gmail',
            port:587,
            auth:{
                user:config.app.emailApp,
                pass:config.app.passwordApp
            }
        })
    }

    sendMail = async(emails,template,payload) => {
        const mailInfo = DmailInfo[template];
        const html = await generateMailTemplate(template,payload);
        const result = await this.mailer.sendMail({
            from: 'Fabri <fabriziocolumba@gmail.com>',
            to: emails,
            html,
            ...mailInfo
        })
        return result;
    }
}