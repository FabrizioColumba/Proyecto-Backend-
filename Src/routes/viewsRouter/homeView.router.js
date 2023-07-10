import BaseRouter from "../base.router.js"
export default class HomeViewRouter extends BaseRouter {
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{

            
            res.render('home',{
                css:'home'
            })
        })

    }
}