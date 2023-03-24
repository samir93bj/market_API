import { save, list, getById, login } from '../business/user.service.js'

class UserService {
  async list () {
    return await list()
  }

  async getById (id) {
    return await getById(id)
  }

  async save (user) {
    return await save(user)
  }

  async login (userAndPassword) {
    return await login(userAndPassword)
  }
}

export default UserService
