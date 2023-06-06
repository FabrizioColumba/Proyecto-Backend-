import userModel from '../models/user.js'


export default class UsersManager{
    getUsers= ()=>{
        return productsModel.find().lean()
    }

    getUser=(params)=>{
        return userModel.findOne(params).lean()
    }

    createUser=(user)=>{
        return userModel.create(user)
    }

    updateUser=(id, user)=>{
        return userModel.findByIdAndUpdate(id, {$set: product})
    }

    deleteUser=(id)=>{
        return userModel.findByIdAndDelete(id)
    }
}