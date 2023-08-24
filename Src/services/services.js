import UsersManager from "../dao/managers/userManager.js";
import UserServices from "./userServices.js";

export const  userServices = new UserServices(new UsersManager);

import CartManager from "../dao/managers/cartManager.js";
import CartServices from "./cartServices.js";

export const cartServices = new CartServices(new CartManager);

import ProductManager from "../dao/managers/productsManager.js";
import ProductServices from "./productServices.js";

export const productServices = new ProductServices(new ProductManager);

import TiketServices from '../services/ticketsServices.js'
import TiketManager from '../dao/managers/tiketManager.js'

export const tiketServices = new TiketServices(new TiketManager)