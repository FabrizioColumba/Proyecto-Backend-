import RouterPadre from '../router.js'

export default class LoginAndRegisterView extends RouterPadre{
    init(){
        this.get('/register', ["PUBLIC"], async (req,res)=>{
            res.render('register',{
                css: 'register'
            })
        })

        this.get('/login', ["PUBLIC"], async (req,res)=>{
            res.render('login', {
                css:'login'
            })
        })


    }
}