import { Router } from "express";
import passport from "passport";

const router= Router()

router.post('/register',passport.authenticate("register",{failureRedirect:"api/sessions/registerFail"}),async(req,res)=>{
    res.send({status:"success",messages:"Registered"});
})

router.get("/registerFail",(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages});
})

router.post('/login', async (req,res)=>{
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    return res.sendStatus(200);
})
router.get("/loginFail",(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages});
});

router.get('/github',passport.authenticate('github'),(req,res)=>{});

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user.id,
        name: user.first_name,
        role:user.role,
        email:user.email
    }
    res.send({status:"success",message:"Logueado con GitHub!"})
})

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(error => {
            if (error) {
                console.log(error);
            }
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error, 'logout error');
    }
})


export default router