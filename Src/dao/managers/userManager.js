import userModel from '../models/userModel.js'


export default class UsersManager{
    getUsers= ()=>{
        return productsModel.find().lean().populate("cart")
    }

    getUser=(params)=>{
        return userModel.findOne({[params]: user}).lean().populate('cart')
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