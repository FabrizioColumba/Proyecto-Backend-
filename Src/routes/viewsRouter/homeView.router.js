import BaseRouter from "../base.router.js"
import productModel from "../../dao/models/productsModel.js"
import { userServices, cartServices } from "../../services/services.js"
export default class HomeView extends BaseRouter{
    init(){
        this.get('/home', ["USER","ADMIN","PREMIUM"], async (req,res)=>{
           
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
            
            

            const userId= req.user.id
            let role= req.user.role
            
            const isUser = role === 'USER';
            const isPremium = role === 'PREMIUM';
            const isAdmin= role === 'ADMIN'
          
            const userDb= await userServices.getUser('email', req.user.email)
            const imgProfile= userDb.imgProfile
            const cart= req.user.cart
            const cartDb= await cartServices.getCartById(cart[0]._id)
            const totalQuantity= cartDb.totalQuantity
           
            res.render('home',{
                css:'home',
                products,
                page:currentPage, 
                hasNextPage,
                hasPrevPage,
                prevPage,
                nextPage,
                totalQuantity:totalQuantity,
                userId:userId,
                role:role,
                isPremium: isPremium,
                isAdmin: isAdmin,
                isUser:isUser,
                imgProfile:imgProfile
            })
        })
    }
}