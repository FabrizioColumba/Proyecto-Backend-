import mongoose from "mongoose";

const collection = "Cart";

const schema = new mongoose({
        quantity:Number,
        idProduct:String
    },{timestamp:{createdAt:"created_at",updatedAt:"updated_at"}}
)

const CartModel = mongoose.model(collection, schema)

export default CartModel;