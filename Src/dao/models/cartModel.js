import mongoose from "mongoose";

const collection= 'Carts'

const schema= new mongoose.Schema({
    products:[
        {
            product: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: 'Products'
            },
            quantity: {
              type: Number,
              default: 1
            },
            amount: {
              type: Number,
              default: 0
            }
          }
       ],
        totalAmount:{
            type:Number,
            default: 0
        },
        totalQuantity:{
          type:Number,
          default: 0
        },
        owner:String
      
},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})
/*
schema.pre('find', function(){
  this.this.populate('products.product')
})*/

const cartModel= mongoose.model(collection,schema)
export default cartModel;