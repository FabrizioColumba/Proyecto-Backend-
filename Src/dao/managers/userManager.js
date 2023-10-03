import userModel from "../models/userModel.js";


export default class UserManager{
    getUsers= ()=>{
        return userModel.find().lean().populate('cart')
    }

    getUser=(params,user)=>{
        return userModel.findOne({[params]: user}).lean().populate('cart')
    }

    getUserById=(uid)=>{
        return userModel.findById(uid)
    }
    
    updateUserBy = (params, user, newData) => {
        return userModel.findOneAndUpdate({ [params]: user }, newData, { new: true });
    }
  
    updateUserLastConection=(userId, newConection)=>{
        return userModel.findByIdAndUpdate(userId, { last_conection: newConection }, { new: true })
    }

    updateUserExpiration=(userId, newExpiration)=>{
        return userModel.findByIdAndUpdate(userId, { expiration: newExpiration }, { new: true })
    }
    createUser=(user)=>{
        return userModel.create(user)
    }

    updateUser=(uid, user)=>{
        return userModel.findByIdAndUpdate(uid, {$set: user})
    }

    deleteUser=(uid)=>{
        return userModel.findByIdAndDelete(uid)
    }

}