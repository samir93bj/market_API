import CartDaoFactory from '../daos/cart/cartDaoFactory.js'
const cartDaoFactory = new CartDaoFactory()

class CartDaoRepository {
  constructor () {
    this.dao = cartDaoFactory.getDao()
  }

  async list () {
    return this.dao.list()
  }

  async getById (id) {
    return this.dao.getById(id)
  }

  async save () {
    return this.dao.save()
  }

  async addProduct (id, data) {
    return this.dao.addProduct(id, data)
  }

  async deleteProduct (idCart, idProduct) {
    return this.dao.deleteProduct(idCart, idProduct)
  }

  async delete (id) {
    return this.dao.delete(id)
  }
}

export default CartDaoRepository
