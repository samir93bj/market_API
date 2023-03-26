import { config } from '../../../config/config.js'
import { Connection } from '../../../db/MongoDb/connection.js'

const dataBaseContext = config.dataBase
let dao

switch (dataBaseContext) {
  case 'mongoDB' :
    // eslint-disable-next-line no-case-declarations
    const { BuyDaoMongo } = await import('./buyDaoMongo.js')
    dao = new BuyDaoMongo()
    Connection()
    break
  case 'localStorage' :
    // eslint-disable-next-line no-case-declarations
    /*
      TODO:Create File Local Buy
    */
    // eslint-disable-next-line no-case-declarations
    const { BuyDaoMemory } = await import('./buyDaoLocalFile.js')
    dao = new BuyDaoMemory()
    break
}

class BuyDaoFactory {
  static instance = BuyDaoFactory

  getDao () {
    return dao
  }
}

export default BuyDaoFactory
