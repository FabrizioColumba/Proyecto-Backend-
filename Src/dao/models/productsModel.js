import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "Products";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:{
        type:String,
        enum:["Procesadores","Placas de video","Memorias Ram"],
    },
    stock:{
        type:Number,
        default: 10
    },
    code:String,
    img:String,
    status:{
        type:String,
        default:true
    },
    quantity:{
        type:Number,
        default:1
    }, 
    owner: {
        type: String,
        default: 'ADMIN'
    }
    },{timestamp:{createdAt:"created_at",updatedAt:"updated_at"}}
)

schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)

export default productModel;