import { faker } from "@faker-js/faker/locale/es";

export const generateMoksProducts=()=>{
    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        quantity: faker.number.int(),
        thumnail: faker.image.url(),
        code: faker.number.int(),
        id: faker.database.mongodbObjectId()
    }
    
}


