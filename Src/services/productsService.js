import ProductsManager from '../dao/managers/productsManager.js'

export default class ProductsServices{
    constructor(dao){
        this.dao= dao
    }

    getProducts= ()=>{
        return this.dao.getProducts()
    }

   


    getProductById=(pid)=>{
        return this.dao.getProductById(pid)
    }

    getProductsByOwnerEmail=(email)=>{
        return this.dao.getProductsByOwnerEmail(email)
    }


    getProductsTo= (param1,param2)=>{
        return this.dao.getProductsTo(param1,param2)
    }

    getProductBy=(param1,param2)=>{
        return this.dao.getProductBy(param1,param2)
    }

    createProduct=(product)=>{
        return this.dao.createProduct(product)
    }

    createProducts=(products)=>{
        return this.dao.createProducts(products)
    }

    updateProduct=(pid, product)=>{
        return this.dao.updateProduct(pid,product)
    }

    deleteProduct=(pid)=>{
        return this.dao.deleteProduct(pid)
    }

   
}