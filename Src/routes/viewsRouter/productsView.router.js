import BaseRouter from "../base.router.js";
import productModel from "../../dao/models/productsModel.js";
import { productServices } from "../../services/services.js";
export default class ProductsView extends BaseRouter{
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{
            const { page = 1, category, limit: queryLimit} = req.query
    
            const defaultLimit = 6
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
            const role= req.user.role
            const isUserOrPremiumOrAdmin = role === "USER" || role === "PREMIUM" || role === "ADMIN"
            
        
            if(category){
                const productsfilter = await productServices.getProductsTo("category",category)
            
                res.render('products',{
                    productsfilter,
                    hasPrevPage: false,
                    hasNextPage: false,
                    productsfilter:productsfilter,
                    isUserOrPremiumOrAdmin:isUserOrPremiumOrAdmin,
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
         isUserOrPremiumOrAdmin:isUserOrPremiumOrAdmin,
         css:'products'
         })
    }
        })
    }
}