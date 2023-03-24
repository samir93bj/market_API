import mongoose from 'mongoose'
import connectionData from '../db/db.config.js'
import error from '../utils/error.js'

const connection = async () => {
  try {
    await mongoose.connect(connectionData.connection_mongoDB.uri)
  } catch (err) {
    process.exit(1)
  }
}

connection()

class Store {
  constructor (model) {
    this.Model = model
  }

  async list () {
    try {
      const list = await this.Model.find()

      return list
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async getById (id) {
    try {
      const item = await this.Model.findById(id)
      return item
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async save (newItem) {
    try {
      const item = new this.Model(newItem)
      const itemSave = await this.Model.create(item)

      return itemSave
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async update (id, item) {
    try {
      await this.Model.findByIdAndUpdate(id, item)
      const newUpdated = await this.getById(id)

      return newUpdated
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async delete (id) {
    try {
      await this.Model.findByIdAndDelete(id)

      return id
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }
}

export default Store
