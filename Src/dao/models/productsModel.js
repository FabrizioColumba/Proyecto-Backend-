import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = "Products";

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:String,
    stock:{
        type:Number,
        default: 10
    },
    code:String,
    thumbnail:Array,
    status:{
        type:String,
        default:true
    },
    quantity:{
        type:Number,
        default:1
    }
    },{timestamp:{createdAt:"created_at",updatedAt:"updated_at"}}
)

schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)

export default productModel;