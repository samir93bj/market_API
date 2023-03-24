import UserDaoFactory from '../daos/user/userDaoFactory.js'
const userDaoFactory = new UserDaoFactory()

class UserRepository {
  constructor () {
    this.dao = userDaoFactory.getDao()
  }

  async list () {
    return this.dao.list()
  }

  async getById (id) {
    return this.dao.getById(id)
  }

  async getByUsername (username) {
    return this.dao.getByUsername(username)
  }

  async save (user) {
    return this.dao.save(user)
  }
}

export default UserRepository
