import productModel from "../models/productsModel.js";

export default class ProductManager {
    getProduct = () => {
        return productModel.find().lean();
    }
    getProductsTo = (param1,param2)=>{
        return productModel.find({[param1]:param2}).lean()
    }
    getProductBy = (params) =>{
        return productModel.findOne(params).lean().populate("products.product");
    }
    createProduct = (product) =>{
        return productModel.create(product);
    }
    createProducts=(products)=>{
        return productModel.insertMany(products)
    }
    updateProduct = (id, product) =>{
        return productModel.findByIdAndUpdate(id, { $set: product});
    }
    deleteProduct = (id) =>{
        return productModel.findByIdAndDelete(id);
    }
}