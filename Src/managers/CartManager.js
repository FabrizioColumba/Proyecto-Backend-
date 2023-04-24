import fs from 'fs';
export default class CartManager {
    constructior() {
        this.products = [];
        this.path = "./data/cart.json";
    }

    getCarts = async () => {
        try {
            const data = fs.existsSync(this.path);
            if (data) {
                const info = await fs.promises.readFile(this.path, "utf-8");
                const productsToAdd = JSON.parse(info);
                return productsToAdd;
            }else{
                console.log("No data found")
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async () => {
        const carts = await this.getCarts();

        const newCart = {
            products: [],
        };
        if (carts.length === 0) {
            newCart.id = 1;
        } else {
            newCart.id = carts[carts.lenght -1] + 1;
        }
        carts.push(newCart);
        fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    };

    addProductInCart = async (idCart, productsToAdd) => {
        const carts = await this.getCarts();

        const cartSelected = carts.find((cart) => cart.id === idCart);

        const inCart = cartSelected.products.find((p) =>  p.product ===  productsToAdd.products);
    
        if (!inCart) {
            cartSelected.products.push(productsToAdd);
            console.log(productsToAdd);
        } else {
            const index = cartSelected.products.findIndex((p) => p.product === productsToAdd.products);
        }
        const newCart = carts.map((cart) => cart.id == idCart  ? { ...cart, ...cartSelected } : cart
        ); 
        fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
    };
};