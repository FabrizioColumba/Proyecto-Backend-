import RouterPadre from '../router.js'
import productsModel from '../../dao/models/productsModel.js'
import {productsService,userServices} from '../../services/services.js'


export default class ProductsView extends RouterPadre{
    init(){
        this.get('/', ["PUBLIC","PREMIUM","ADMIN"], async (req,res)=>{
            const { page=1, category, limit: queryLimit}= req.query
    
            const defaultLimit = 6
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
            const role= req.user.role
            const isAdmin = role === "ADMIN"
            const isUserOrPremium = role === "USER" || role === "PREMIUM"
            const isPremium=  role === "PREMIUM"
            const isUser= role === "USER"
           
            if(category){
                const productsfilter= await productsService.getProductsTo("category",category)
                res.render('products',{
                    productsfilter,
                    hasPrevPage: false,
                    hasNextPage: false,
                    productsfilter:productsfilter,
                    isAdmin:isAdmin,
                    isUserOrPremium:isUserOrPremium,
                    isPremium:isPremium,
                    isUser:isUser,
                    css:'products'
                })
            }else{

            const {docs, totalPages, page: currentPage}=
            await productsModel.paginate({}, {page, limit, lean:true})
            const products= docs
            
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
         isAdmin:isAdmin,
         isUserOrPremium:isUserOrPremium,
         isPremium:isPremium,
         isUser:isUser,
         css:'products'
         })
    }
        })


        this.get('/newProduct',["ADMIN", "PREMIUM"], async (req,res)=>{
            res.render('newProduct',{css:'newProduct'})
        })
        
        this.get('/updateProduct/:pid', ["PREMIUM", "ADMIN"], async(req,res)=>{
            const {pid}= req.params
            const productDb= await productsService.getProductById(pid)
            const product={
                title: productDb.title,
                description: productDb.description,
                price:productDb.price,
                category: productDb.category,
                stock: productDb.stock,
                img:productDb.img,
                id: productDb._id

            }
       
            res.render('updateProduct',{
                product
            })
        })


        this.get('/useproducts/:userAlias',["ADMIN", "USER","PREMIUM"], async (req,res)=>{
            const {userAlias}=req.params
            const userDb= await userServices.getUser('alias',userAlias)
         
            const products= await productsService.getProductsByOwnerEmail(userDb.email)
      
            const productsJSON = JSON.parse(JSON.stringify(products));
            const role= req.user.role
            const isAdmin = role === "ADMIN"
            const isUserOrPremium = role === "USER" || role === "PREMIUM"
            const isPremium=  role === "PREMIUM"
            const isUser= role === "USER"
           
            res.render('usersproducts',{
                productsJSON,
                isAdmin,
                isUserOrPremium:isUserOrPremium,
                isPremium,
                isUser,
                userAlias:userAlias
            })
        })

    }

}