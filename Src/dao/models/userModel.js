import mongoose from "mongoose";

const collection= 'Users'
const schema= new mongoose.Schema({
    first_name: String, 
    last_name: String,
    alias:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require: true,
        unique:true
    },
    cart:[
        {
            type: mongoose.SchemaTypes.ObjectId,
             ref: 'Carts',
           
        }
    ],
    role:{
        type:String,
        enum:['ADMIN', 'USER', 'PREMIUM'],
        default: 'USER'
    },
    documents:[
        {
            name:String,
            reference: String
        }
    ],
    last_conection:Date,
    expiration: Date
})
      
const userModel= mongoose.model(collection, schema)
export default userModel