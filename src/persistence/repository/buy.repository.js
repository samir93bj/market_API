import BuyDaoFactory from '../daos/buy/buyDaoFactory.js'
const buyDaoFactory = new BuyDaoFactory()

class BuyDaoRepository {
  constructor () {
    this.dao = buyDaoFactory.getDao()
  }

  async list () {
    return this.dao.list()
  }

  async getById (id) {
    return this.dao.getById(id)
  }

  async save (sale) {
    return this.dao.save(sale)
  }
}

export default BuyDaoRepository
