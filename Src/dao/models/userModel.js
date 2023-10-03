import mongoose from "mongoose";

const collection= 'Users'

const schema = new mongoose.Schema({
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

const userModel = mongoose.model(collection, schema)
export default userModel