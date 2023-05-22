import mongoose from "mongoose";

const collection = "Products";

const schema = new mongoose({
    title:String,
    description:String,
    price:Number,
    stock:Number,
    },{timestamp:{createdAt:"created_at",updatedAt:"updated_at"}}
)

const productModel = mongoose.model(collection, schema)

export default productModel;