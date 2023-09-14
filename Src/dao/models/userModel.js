import mongoose from "mongoose";

const collection= 'Users'

const schema = new mongoose.Schema({
    imgProfile:{
        type:String,
        default:'https://i.pinimg.com/564x/3b/94/6e/3b946eb954f03a7eb2bbe6bfa02a22be.jpg'
    },
    first_name: String,
    last_name :String,
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    cart:[
        {
            type: mongoose.SchemaTypes.ObjectId,
             ref: 'Carts',
        }
    ],
    role:{
        type: String,
        enum:['ADMIN', 'USER', 'PREMIUM'],
        default:"user",
    },
    documents:[
        {
            name:String,
            reference: String
        }
    ],
    last_conection:String

},{timestamps:{createdAt:`created_at`, updatedAt:`updated_at`}})

const userModel= mongoose.model(collection, schema)
export default userModel