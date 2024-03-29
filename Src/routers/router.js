import { Router } from "express";
import { passportCall } from "../util.js"

export default class RouterPadre{
    constructor(){
        this.router= Router()
        this.init()
    }
    getRouter(){
      return  this.router
    }
    init(){}
    get(path,policies, ...callbacks){
        this.router.get(path,this.generateCustomResponse,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    post(path,policies, ...callbacks){
        this.router.post(path,this.generateCustomResponse,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    put(path, policies,...callbacks){
        this.router.put(path,this.generateCustomResponse,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    delete(path, policies,...callbacks){
        this.router.delete(path,this.generateCustomResponse,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    generateCustomResponse =(req,res,next)=>{
        res.sendSuccess= (message)=>{
            res.send({status:'success', message})
        }
        res.sendSuccessAndPayload=(payload)=>{
            res.send({status:'success', payload})
        }
        res.sendError= (error)=>{
            res.status(500).send({status:'error', error})
        }
        res.sendInternalError = error => res.status(500).send({ status: "error", error: error.toString() });
        
        res.sendIncompleteValues = error => res.status(400).send({ status: "error", message: "The fields are all required", error: error });
        next()
    }

    handlePolicies = policies => {
        return (req,res,next) => {
            if(policies[0]==="PUBLIC") return next();
            const user = req.user;
            if(policies[0]==="NO_AUTH" && user) return res.status(401).send({status:"error",error:"Unauthorized"});
            if(policies[0]==="NO_AUTH" && !user) return next();
            if(!user) return res.status(401).send({status:"error",error:req.error});
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:"error",error:"Forbidden"});
            next();
        }
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback=> async(...params)=>{
            try{
                await callback.apply(this,params)
            }
            catch(error){
                params[1].sendInternalError(error);
            }
        })
    }
}