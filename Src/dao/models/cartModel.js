import mongoose from "mongoose";

const collection= "Carts"

const schema= new mongoose.Schema({
   products:{
    type:[
        {
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products'

            }
        }
    ]
   },
    totalAmount:{
        type:Number,
        default: 0
    },
    default: [],
    user:{
        type: String,
        default: "UserCart"
    } 


},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)

const cartModel = mongoose.model(collection, schema)
export default cartModel;