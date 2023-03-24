import { config } from '../../../config/config.js'

const dataBaseContext = config.dataBase
let dao

switch (dataBaseContext) {
  case 'mongoDB' :
    // eslint-disable-next-line no-case-declarations
    const { ProductDaoMongo } = await import('./productDaoMongo.js')
    dao = new ProductDaoMongo()
    break
  case 'localStorage' :
    // eslint-disable-next-line no-case-declarations
    const { ProductMemoryDao } = await import('./productDaoLocalFile.js')
    dao = new ProductMemoryDao()
    break
}

class ProductDaoFactory {
  static instance = ProductDaoFactory

  getDao () {
    return dao
  }
}

export default ProductDaoFactory
