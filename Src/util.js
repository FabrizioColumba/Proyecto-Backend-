import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createHash = async (password) =>{
    //Generar los salts
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);



export const generateToken= (user)=>{
    const token= jwt.sign(user,'JwtKeySecret', {expiresIn: '24h'})
    return token
}
export const generateMailTemplate= async (template, payload)=>{
    const content= await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`, 'utf-8')
    const preCompiled= Handlebars.compile(content)
    const compiledContent= preCompiled({...payload})
    return compiledContent
}

export default __dirname