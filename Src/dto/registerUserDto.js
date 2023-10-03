export default class RegisterUserDTO {
    static getFrom = (user) =>{
        return {
            first_name: user.first_name,
            last_name:user.last_name,
            user_name: user.user_name,
            email:user.email,
            role:user.role,
            password:user.password,
            cart:user.cart
        }
    }
}