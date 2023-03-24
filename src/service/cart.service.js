import { save, list, addProduct, getById, deleteById, deleteProduct } from '../business/cart.service.js'
import error from '../utils/error.js'

class CartService {
  async list () {
    const carts = await list()
    return carts
  }

  async getById (id) {
    const cart = getById(id)

    if (!cart) {
      throw error('Cart not exist', 400)
    }

    return cart
  }

  async save () {
    const newCart = await save()

    return newCart
  }

  async addProduct (id, idProduct) {
    const cartUpdated = await addProduct(id, idProduct)
    return cartUpdated
  }

  async deleteProduct (idCart, idProduct) {
    await this.getById(idCart)

    await deleteProduct(idCart, idProduct)
    const cartUpdated = await this.getById(idCart, idProduct)

    return cartUpdated
  }

  async delete (id) {
    const cart = await this.getById(id)
    await deleteById(cart.id)
    return id
  }
}

export default CartService
