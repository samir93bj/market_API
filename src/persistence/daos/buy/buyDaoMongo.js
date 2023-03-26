import Sale from '../../../db/MongoDb/models/sale.model.js'
import error from '../../../utils/error.js'

class BuyDaoMongo {
  constructor () {
    this.BuyModel = Sale
  }

  async list () {
    try {
      const sales = await this.BuyModel.find()
      return sales
    } catch (err) {
      throw error('Internal server error.', 500)
    }
  }

  async getById (id) {
    try {
      const sale = await this.BuyModel.findById(id)
      return sale
    } catch (err) {
      throw error('Internal server error.', 500)
    }
  }

  async save (sale) {
    try {
      const saleSaved = await this.BuyModel.create(sale)
      return saleSaved
    } catch (err) {
      throw error('Internal server error.', 500)
    }
  }
}

export { BuyDaoMongo }
