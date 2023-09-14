import userModel from '../models/userModel.js'


export default class UsersManager{
    getUsers= ()=>{
        return productsModel.find().lean().populate("cart")
    }

    getUser=(params)=>{
        return userModel.findOne({[params]: user}).lean().populate('cart')
    }

    uptateUserRole=(userId, newRole)=>{
        return userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true })
    }
    updateUserBy = (params, user, newData) => {
        return userModel.findOneAndUpdate({ [params]: user }, newData, { new: true });
    }
    
    updateUser=(uid, user)=>{
        return userModel.findByIdAndUpdate(uid, {$set: user})
    }
    
    createUser=(user)=>{
        return userModel.create(user)
    }


    deleteUser=(uid)=>{
        return userModel.findByIdAndDelete(uid)
    }
}