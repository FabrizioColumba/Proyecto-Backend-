export default class UserServices{

    constructor(dao){
        this.dao= dao
    }
    getUsers(){
        return this.dao.getUsers()
    }

    getUser(params,user){
        return this.dao.getUser(params,user)
    }

    getUserById=(uid)=>{
        return this.dao.getUserById(uid)
    }

    createUser(user){
        return this.dao.createUser(user)
    }

    updateUser(uid,user){
        return this.dao.updateUser(uid,user)
    }

    updateUserLastConection=(userId, newConection)=>{
        return this.dao.updateUserLastConection(userId,newConection)
    }
    updateUserExpiration=(userId, newExpiration)=>{
        return this.dao.updateUserExpiration(userId,newExpiration)
    }

    deleteUser(uid){
        return this.dao.deleteUser(uid)
    }
}