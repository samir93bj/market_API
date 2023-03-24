import knex from 'knex'
import connectionData from '../db/db.config.js'
import error from '../utils/error.js'

const database = knex(connectionData.connection_MariaDB)

class Store {
  constructor (table) {
    this.table = table
  }

  async list () {
    try {
      const list = await database.from(`${this.table}`).select('*')

      return list
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async getById (id) {
    try {
      const item = await database(`${this.table}`).where('id', id)

      return item
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async save (item) {
    try {
      const itemSave = await database(`${this.table}`).insert(item)

      return itemSave[0]
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async update (id, item) {
    try {
      const newItem = await database(`${this.table}`).where('id', id).update(item)

      return newItem
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async delete (id) {
    try {
      await database(`${this.table}`).where('id', id).del()

      return id
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }
}

export default Store
