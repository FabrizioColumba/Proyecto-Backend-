import BaseRouter from "../base.router.js"
import productModel from "../../dao/models/productsModel.js"
export default class HomeViewRouter extends BaseRouter {
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{

            const { page=1, limit: queryLimit}= req.query 
            const defaultLimit = 3
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
            

            const {docs, totalPages, page: currentPage}=
            await productModel.paginate({}, {page, limit, lean:true})
            const products= docs
            
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const prevPage = hasPrevPage ? currentPage - 1 : null;
            const nextPage = hasNextPage ? currentPage + 1 : null;
            
            const cart= req.user.cart
            const totalQuantity = cart[0].totalQuantity
            
            res.render('home',{
                products,
                page:currentPage, 
                hasNextPage,
                hasPrevPage,
                prevPage,
                 nextPage,
                 totalQuantity:totalQuantity
               })
        })

    }
}