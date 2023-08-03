import { Router } from "express";
import { passportCall } from "../middlewares/auth.js"

export default class BaseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init(){}

    getRouter = () => this.router;

    get(path,policies,...callbacks){
        this.router.get(path,passportCall('jwt',{strategyType:'jwt'}), this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks));
    }
    post(path,policies,...callbacks){
        this.router.post(path,passportCall('jwt',{strategyType:'jwt'}), this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks));
    }
    put(path,policies,...callbacks){
        this.router.put(path,passportCall('jwt',{strategyType:'jwt'}), this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks));
    }
    delete(path,policies,...callbacks){
        this.router.delete(path,passportCall('jwt',{strategyType:'jwt'}), this.handlePolicies(policies),this.generateCustomResponses,this.applyCallbacks(callbacks));
    }

    generateCustomResponses = (req,res,next) =>{
        res.sendSuccess = message => res.send({status:"success",message});
        res.sendSuccessWithPayload = payload => res.send({status:"success",payload});
        res.sendInternalError = error => res.status(500).send({status:"error",error});
        res.sendUnauthorized = error => res.status(400).send({status:"error",error});
        next();
    }

    handlePolicies = policies => {
        return (req,res,next) => {
            if(policies[0]==="PUBLIC") return next();
            const user = req.user;
            if(policies[0]==="NO_AUTH"&&user) return res.status(401).send({status:"error",error:"Unauthorized"});
            if(policies[0]==="NO_AUTH"&&!user) return next();
            if(!user)res.redirect('/login')
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:"error",error:"Forbidden"});
            next();
        }
    }


    applyCallbacks(callbacks){
        return callbacks.map(callback=>async(...params)=>{
            try{
                await callback.apply(this,params);
            }catch(error){
                params[1].sendInternalError(error);
            }
        })
    }
}