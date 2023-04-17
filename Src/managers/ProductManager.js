import fs from 'fs';
export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  initialize = async () => {
    const productsJson = JSON.stringify(this.products)
    await fs.promises.writeFile(this.path, productsJson)
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      this.products = products
      return this.products;
    }
    return this.products;
  }

  addProduct = async (newProduct) => {
    try {
      await this.getProducts()
      if (!newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
      ) {
        throw new Error("Product Incomplete");
      }
      const validateCode = this.products.find((p) => p.code === newProduct.code);

      if (validateCode) {
        console.log("Este codigo de producto esta repetido");
        return null;
      }
      else {
        console.log("Ok");
      }

      if (this.products.length === 0) {
        console.log('ID');
        newProduct.id = 1;
      } else {
        const lastProduct = this.products[this.products.length - 1];
        newProduct.id = lastProduct.id + 1;

      }
      this.products.push(newProduct);
      const data = JSON.stringify(this.products, null, '\t');
      await fs.promises.writeFile(this.path, data);
    }
    catch (error) {
      console.log("error linea 51");
    }
  }
  getProductsById = async (ProductsId) => {
    const data = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(data)
    const getId = this.products.find(
      p => p.id === ProductsId
    );
    if (getId) {
      return getId;
    } else {
      console.log("Producto no encontrado");
      return null;
    }
  };
  deleteProduct = async (ProductsId) => {
    await this.getProducts()

    //verificacion de id para eliminar
    const data = this.products.find(product => product.id === ProductsId);
    if (!data) return console.log("Producto no encontrado");
    //metodo de eliminacion
    let dataJSON = [] //array auxiliar 

    this.products.forEach(element => {
      if (element.id !== ProductsId) {
        dataJSON.push(element);
      }
    })
    // Sobreescritura del json
    const parseJSON = JSON.stringify(dataJSON, null, '\t');
    await fs.promises.writeFile(this.path, parseJSON);
    return;
  }

  updateProduct = async (ProductsId, updateObject) => {
    await this.getProducts()
    let productsOfFS = this.products.map(element => {
      if (element.id == ProductsId) {
        element = Object.assign(element, updateObject);
        return element
      }
      return element
    })
    const parseJSON = JSON.stringify(productsOfFS, null, '\t');
    await fs.promises.writeFile(this.path, parseJSON);
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock = 10) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
};

const productManager = new ProductManager("./products.json");
const test = async () => {
      await productManager.initialize();
      await productManager.getProducts();
      // console.log(await productManager.getProducts());
  // //AGREGA PRODUCTO
      await productManager.addProduct({title:"Placa Video Msi Geforce Rtx 3060 Ti Ventus 3x Oc Lhr 8gb", description: "GeForce RTX™ 3060 Ti te permite encarar los últimos títulos utilizando todo el poder de Ampere, la 2da generación de arquitectura RTX de NVIDIA.", price:1500, thumbnail:"./placa.png", code:123, stock:10})
  // // POR ID
      //await productManager.getProductsById(1);
      // await productManager.getProductsById(2);
  // //UPDATE DEL PRODUCTO
      // await productManager.updateProduct(2, {
        //   "title":"Placa Video Msi Geforce Rtx 3060 Ti Ventus 3x Oc Lhr 8gb",
        //   "description":"GeForce RTX™ 3060 Ti te permite encarar los últimos títulos utilizando todo el poder de Ampere, la 2da generación de arquitectura RTX de NVIDIA.",
        //   "price":2750,
        //   "thumbnail":"./placa.png",
        //   "code":"456",
        //   "stock":2000
        //   }
        // );
  //ELIMINA EL PRODUCTO POR ID
      //await productManager.deleteProduct(1);
};
test();
