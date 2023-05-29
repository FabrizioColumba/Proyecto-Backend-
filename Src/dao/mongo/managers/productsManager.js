import productModel from "../models/productsModel.js";

export default class ProductManager {
    getProduct = () => {
        return productModel.find().lean();
    }
    getProductBy = (params) =>{
        return productModel.findOne(params).lean().populate("products.product");
    }
    createProduct = (product) =>{
        return productModel.create(product);
    }
    updateProduct = (id, product) =>{
        return productModel.findByIdAndUpdate(id, { $set: product});
    }
    deleteProduct = (id) =>{
        return productModel.findByIdAndDelete(id);
    }
}