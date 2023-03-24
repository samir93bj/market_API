import { config } from '../../../config/config.js'

const dataBaseContext = config.dataBase
let dao

switch (dataBaseContext) {
  case 'mongoDB' :
    // eslint-disable-next-line no-case-declarations
    const { UserDaoMongo } = await import('./userDaoMongo.js')
    dao = new UserDaoMongo()
    break
  case 'localStorage' :

    break
}

class UserDaoFactory {
  static instance = UserDaoFactory

  getDao () {
    return dao
  }
}

export default UserDaoFactory
