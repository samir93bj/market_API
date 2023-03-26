import User from '../../../db/MongoDb/models/user.model.js'
import error from '../../../utils/error.js'

class UserDaoMongo {
  constructor () {
    this.UserMongo = User
  }

  async list () {
    try {
      const users = this.UserMongo.find()
      return users
    } catch (err) {
      throw error('Internal Error', 500)
    }
  }

  async getById (id) {
    try {
      const user = this.UserMongo.findById(id)
      return user
    } catch (err) {
      throw error('Internal Error', 500)
    }
  }

  async getByUsername (username) {
    try {
      const user = this.UserMongo.findOne({ username })
      return user
    } catch (err) {
      throw error('Internal Error', 500)
    }
  }

  async save (user) {
    try {
      const newUser = await this.UserMongo.create(user)
      return newUser
    } catch (err) {
      throw error('Internal Error', 500)
    }
  }
}

export { UserDaoMongo }
