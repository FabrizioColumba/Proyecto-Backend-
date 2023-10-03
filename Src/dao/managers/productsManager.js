import productsModel from '../models/productsModel.js';

export default class ProductsManager{
    getProducts= ()=>{
        return productsModel.find().lean()
    }
    getListProductsToId=(productsIds)=>{
        return productsModel.find({ _id: { $in: productsIds } })
    }
    getProductById=(pid)=>{
        return productsModel.findById(pid)
    }
    getProductsTo= (param1,param2)=>{
        return productsModel.find({[param1]:param2}).lean()
    }
    getProductBy=(param1,param2)=>{
        return productsModel.findOne({[param1]:param2}).lean()
    }

    createProduct=(product)=>{
        return productsModel.create(product)
    }

    createProducts=(products)=>{
        return productsModel.insertMany(products)
    }
  
    deleteProduct=(pid)=>{
        return productsModel.findByIdAndDelete(pid)
    }
}