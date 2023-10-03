import UserManager from "../dao/managers/userManager.js";
import UserServices from "./userService.js";

export const userServices= new UserServices(new UserManager)

import ProductsManager from '../dao/managers/productsManager.js'
import ProductsServices from '../services/productsService.js'

export const productsService= new ProductsServices(new ProductsManager)


import CartsManager from '../dao/managers/cartManager.js'
import CartsService from './cartService.js'

export const cartsService= new CartsService(new CartsManager)


import TiketServices from '../services/tikets.service.js'
import TiketManager from '../dao/managers/tiketManager.js'

export const tiketService= new TiketServices(new TiketManager)
