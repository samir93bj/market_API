import Cart from '../../../db/Mongo/models/cart.model.js'
import error from '../../../utils/error.js'
import { createCartDto } from '../../dto/cart.dto.js'

class CartDaoMongo {
  constructor () {
    this.CartModel = Cart
  }

  async list () {
    try {
      const Carts = await this.CartModel.find().populate({ path: 'products' })
      return Carts
    } catch (e) {
      throw error('Internal server error', 500)
    }
  }

  async getById (id) {
    try {
      const item = await this.CartModel.findOne({ externalID: id }).populate({ path: 'products' })
      return item
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async save () {
    try {
      const cart = {
        id: await this.generateId()
      }
      const newCart = createCartDto(cart)

      const item = new this.CartModel(newCart)
      return await this.CartModel.create(item)
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async addProduct (cart, product) {
    try {
      cart.products.push(product.id)

      cart.save()
    } catch (error) {
      throw error('Internal Server Error', 500)
    }
  }

  async deleteProduct (idCart, product) {
    try {
      const cart = await this.CartModel.updateOne({ externalID: idCart }, { $pull: { products: product._id } }, { multi: false, new: true })
      return cart
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async delete (id) {
    try {
      await this.CartModel.findOneAndDelete({ externalID: id })

      return id
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async generateId () {
    const cartLatest = await this.CartModel.find({}).sort({ $natural: -1 }).limit(1)

    let id
    if (cartLatest.length === 0) {
      id = 1
    } else {
      id = cartLatest[0].externalID + 1
    }

    return id
  }
}

export { CartDaoMongo }
