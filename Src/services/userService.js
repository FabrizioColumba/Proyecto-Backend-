
export default class UserServices{

        constructor(dao){
            this.dao= dao
        }
        getUsers(){
            return this.dao.getUsers()
        }

        getUserById=(uid)=>{
            return this.dao.getUserById(uid)
        }

        getUser(params,user){
            return this.dao.getUser(params,user)
        }
        updateUserLastConection=(userId, newConection)=>{
            return this.dao.updateUserLastConection(userId,newConection)
        }
        updateUserExpiration=(userId, newExpiration)=>{
            return this.dao.updateUserExpiration(userId,newExpiration)
        }

        createUser(user){
            return this.dao.createUser(user)
        }

        updateUser(uid,user){
            return this.dao.updateUser(uid,user)
        }

        updateUserBy(params, user, newData){
            return this.dao.updateUserBy(params, user, newData)
        }

        deleteUser(uid){
            return this.dao.deleteUser(uid)
        }
}