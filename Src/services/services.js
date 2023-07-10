import UsersManager from "../dao/managers/userManager.js";
import UserServices from "./userServices.js";

export const UserServices = new UserServices(new UsersManager);

import CartManager from "../dao/managers/cartManager.js";
import CartServices from "./cartServices.js";

export const CartServices = new CartServices(new CartManager);

import ProductManager from "../dao/managers/productsManager.js";
import ProductServices from "./productServices.js";

export const Productservices = new ProductServices(new ProductManager);