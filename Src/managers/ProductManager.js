import fs from 'fs';
export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./data/products.json";
  }

  initialize = async () => {
    const productsJson = JSON.stringify(this.products)
    await fs.promises.writeFile(this.path, productsJson)
  };

  getProducts = async () => {

    const data = fs.existsSync(this.path);
    if (data) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(info);

        return products;
    } else {
      console.log(error);
    }
    // if (fs.existsSync(this.path)) {
    //   const data = await fs.promises.readFile(this.path, "utf-8");
    //   const products = JSON.parse(data);
    //   this.products = products
    //   return this.products;
    // }
    // console.log("No products");
    // return this.products;
  }
  addProduct = async ({title,description,price,thumbnails,code,stock,}) => {
    try {
      const products = await this.getProducts();

      const product = {title,description,price,thumbnails,code,stock};
      if (
        (!title,!description,!price, !thumbnails, !code,!stock)
      ) {
        console.log("Products complted");
      }
      const repetCode = products.find((p) => p.code == code);
      if (repetCode) {
        console.log("Code repeted")
      }
      if (products.length == 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product);
      console.log(product)
      fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  getProductsById = async (ProductsId) => {
    try {
      const products = await this.getProducts();
      const getId = products.find(p => p.id == ProductsId);

      getId
        ? console.log(getId)
        : console.log("error product not found");
        null;
        return getId;
    } catch (error) {
      console.log(error);
    }

  };
  deleteProduct = async (ProductsId) => {
    this.products = await this.getProducts();

    //verificacion de id para eliminar
    
    const data = this.products.find(product => product.id == ProductsId);
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

    try {
      const products = await this.getProducts();
      const newProduct = products.map((p) => p.id == ProductsId ? { ...p, ...updateObject } : p);
      console.log(newProduct);
      const parseJSON = JSON.stringify(newProduct, null, '\t');
      await fs.promises.writeFile(this.path, parseJSON);
    } catch (error) {
      console.log(error);
    }
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

// const productManager = new ProductManager("./data/products.json");
// const test = async () => {
//       await productManager.initialize();
//       await productManager.getProducts();
//       // console.log(await productManager.getProducts());
//   // //AGREGA PRODUCTO
//   const product1 = new Product("Placa Video Msi Geforce Rtx 3060 Ti Ventus 3x Oc Lhr 8gb", "GeForce RTX™ 3060 Ti te permite encarar los últimos títulos utilizando todo el poder de Ampere, la 2da generación de arquitectura RTX de NVIDIA.", 1500,"./img/placa.png", 1231, 10)
//   await productManager.addProduct(product1);
//   const product2 = new Product("Memoria Ram Kingston Ddr4 3200mhz 16gb Hyperx Fury Rgb", 'Con su tecnología DDR4, mejorará el desempeño de tu equipo, ya que aumentará la fluidez y la velocidad en la transferencia de datos', 340,"./img/memoria.png" , 1232, 10)
//   await  productManager.addProduct(product2);
//   const product3 = new Product("Procesador Intel Core i9-10900K", "LGA1200, Frecuencia 3.7 GHz, Frecuencia Turbo Max. 5.3 GHz, 10 Núcleos, 20MB L3 Cache, Intel UHD Graphics 630.",800 "./img/procesador.png", 1233, 10)
//   await  productManager.addProduct(product3); 
  //await productManager.addProduct({title:"Placa Video Msi Geforce Rtx 3060 Ti Ventus 3x Oc Lhr 8gb", description: "GeForce RTX™ 3060 Ti te permite encarar los últimos títulos utilizando todo el poder de Ampere, la 2da generación de arquitectura RTX de NVIDIA.", price:1500, thumbnail:"./placa.png", code:123, stock:10})
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
// test();
