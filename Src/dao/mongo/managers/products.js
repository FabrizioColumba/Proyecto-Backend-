import productModel from "../models/products";

export default class ProductManager {
    getProduct = (params) => {
        return productModel.find(params);
    }
    getProductBy = (params) =>{
        return productModel.findOne(params).lean();
    }
    createProduct = (params) =>{
        return productModel.create(params);
    }
    updateProduct = (id, product) =>{
        return productModel.findByIdAndUpdate(id, { $set: product});
    }
    deleteProduct = (id) =>{
        return productModel.findByIdAndDelete(id);
    }
}