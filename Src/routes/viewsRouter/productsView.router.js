import BaseRouter from "../base.router.js";
import productModel from "../../dao/models/productsModel.js";
import { ProductServices } from "../../services/services.js";
import ProductsServices from "../../services/productServices";

export default class ProductsView extends RouterPadre{
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{
            const { page = 1, category, limit: queryLimit} = req.query
    
            const defaultLimit = 3
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
    
        
            if(category){
                const productsfilter = await ProductsServices.getProductsTo("category",category)
               console.log(productsfilter)
                res.render('products',{
                    productsfilter,
                    hasPrevPage: false,
                    hasNextPage: false,
                    productsfilter:productsfilter,
                    css:'products'
                })
            }else{

            const {docs, totalPages, page: currentPage}=
            await productModel.paginate({}, {page, limit, lean:true})
            const products = docs
            
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const prevPage = hasPrevPage ? currentPage - 1 : null;
            const nextPage = hasNextPage ? currentPage + 1 : null;
            
        res.render('products', 
        {products,
         page:currentPage, 
         hasNextPage,
         hasPrevPage,
         prevPage,
         nextPage,
         css:'products'
         })
    }
        })
    }
}