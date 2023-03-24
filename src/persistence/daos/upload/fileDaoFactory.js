import { config } from '../../../config/config.js'

const dataBaseContext = config.dataBase
let dao

switch (dataBaseContext) {
  case 'mongoDB' :
    // eslint-disable-next-line no-case-declarations
    const { FileDaoUploadServer } = await import('./fileDaoServer.js')
    dao = new FileDaoUploadServer()
    break
  case 'localStorage' :

    break
}

class FileDaoFactory {
  static instance = FileDaoFactory

  getDao () {
    return dao
  }
}

export default FileDaoFactory
