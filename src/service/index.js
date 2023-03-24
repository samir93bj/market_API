import { config } from '../config/config.js'
import mongoDB from '../store/mongodb.store.js'
import mariaDB from '../store/mariadb.store.js'
import localDB from '../store/local.store.js'
import firebaseDB from '../store/firestore.js'
import ProductService from './producto.service.js'

let productService

if (config.dataBase === 'mongoDB') {
  productService = new ProductService('', mongoDB)
} else if (config.dataBase === 'mariaDB') {
  productService = new ProductService('', mariaDB)
} else if (config.dataBase === 'firebaseDB') {
  productService = new ProductService('', firebaseDB)
} else {
  productService = new ProductService('productos.json', localDB)
}

export default productService
