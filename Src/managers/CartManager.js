import fs from 'fs';
import ProductManager from './ProductManager.js';
const productManager = new ProductManager();
export default class CartManager {
    constructor() {
        this.products = [];
        this.path = "./data/cart.json";
    }
    //Trae los carritos
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
    //Trayendo el cart x su id
    getCartsById = async (CartsId) => {
        try {
          const carts = await this.getCarts();
          const getId = carts.find(c => c.id == CartsId);
    
          getId
            ? console.log(getId)
            : console.log("error product not found");
            null;
            return getId;
        } catch (error) {
          console.log(error);
        }
    
      };
      //Crea los carritos
    createCart = async () => {
        const carts = await this.getCarts();

        const newCart = {
            products: [],
        };
        if (carts.length == 0) {
            newCart.id = 1;

        } else {
            newCart.id = carts[carts.length -1].id + 1;
            console.log(newCart)
        }
        carts.push(newCart);
        fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    };
    //Mete los prodcutos en el carrito
    addProductInCart = async (idCart,idProduct,quantity) => {
        const cid = parseInt(idCart);
        const carts = await this.getCarts();
        const cartSelected = carts.find((cart) => cart.id === cid);
        const getProduct = await productManager.getProductsById(Number(idProduct))
        if (!getProduct) {
            console.log("product not found")
            return {error: "Product not found"};
        };    
        const product = {quantity,idProduct}
        const inCart = cartSelected.products.find((p) =>  p.idProduct == product.idProduct);
        if (!inCart) {
            cartSelected.products.push(product);
        } else {
            product["quantity"] = inCart["quantity"] + product["quantity"];
        }
        cartSelected.products.map(element => {
            if (element.idProduct === idProduct) {
                element = Object.assign(element, product);
                return element
            }
            return element
        })
        const newCart = carts.map((cart) => cart.id == idCart  ? { ...cart, ...cartSelected } : cart
        ); 
        fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
        return{"message": "Product added"}
    };
};