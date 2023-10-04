import dotenv from 'dotenv'
import { Command } from 'commander'


const program= new Command()

program.option('--mode <mode>', 'modo developer', 'dev')
program.parse()

dotenv.config({
    path:program.opts().mode === 'prod' ? './.env.prod' : './.env.dev'
    })
    
export default {
    app : { 
    PORT: process.env.PORT || 8080,   emailApp: process.env.APP_EMAIL,
    passwordApp: process.env.APP_PASSWORD

    },
    mode:{
        mode: process.env.MODE
    },
    admin:{
        adminEmail:process.env.ADMIN_EMAIL,
        adminPassword: process.env.ADMIN_PASSWORD

    }

    }
    

