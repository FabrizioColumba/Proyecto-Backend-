
export default class CartsServices{
    constructor(dao){
        this.dao= dao
    }
    createCart=()=>{
        return this.dao.createCart()
    }
    getCarts=()=>{
        return this.dao.getCarts()
    }
    
    getCartById=(cid)=>{
        return this.dao.getCartById(cid)
    }
    
    deleteCart=(cid)=>{
        return this.dao.deleteCart(cid)
    }
    
    addProductToCart=(cid,pid)=>{
    return this.dao.addProductToCart(cid,pid)
    }
    subtractProduct=(cid,pid)=>{
        return this.dao.subtractProduct(cid,pid)
    }
}