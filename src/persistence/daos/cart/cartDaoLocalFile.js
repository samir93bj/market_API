import fs from 'fs'
import error from '../../../utils/error.js'
import { createCartDto } from '../../dto/cart.dto.js'

class CartDaoMemory {
  constructor (nameFile = 'carts.json') {
    this.nameFile = nameFile
  }

  async readFile () {
    const data = await fs.promises.readFile(`./db/${this.nameFile}`, 'utf-8')
    return JSON.parse(data)
  }

  async writeFile (data) {
    await fs.promises.writeFile(`./db/${this.nameFile}`, JSON.stringify(data))
    return true
  }

  async list () {
    const carts = await this.readFile()
    return carts
  }

  async getById (id) {
    const data = await this.readFile()
    const cart = data.find(item => item.externalID === parseInt(id)) || null

    return cart
  }

  async save () {
    let newCart = {}
    const data = await this.readFile()

    if (data.length === 0) {
      newCart.id = 1
    } else {
      const lastCart = data[data.length - 1]
      newCart.id = lastCart.externalID + 1
    }

    newCart = createCartDto(newCart)
    data.push(newCart)

    await this.writeFile(data)

    return newCart
  }

  async addProduct (cart, product) {
    const carts = await this.list()

    if (product.stock > 0) {
      cart.products.push(product)
    } else {
      throw error('insufficient stock', 400)
    }

    const index = carts.findIndex(item => item.externalID === cart.externalID)
    carts[index] = cart

    await this.writeFile(carts)

    return cart
  }

  async deleteProduct (idCart, idProduct) {
    const cart = await this.getById(idCart)
    const productInCart = cart.products.find(item => item.externalID === parseInt(idProduct.externalID) || null)

    if (!productInCart) {
      throw error('The product does not exist in the cart', 400)
    }

    const index = cart.products.findIndex(item => item.externalID === parseInt(idProduct.externalID))
    cart.products.splice(index, 1)

    const carts = await this.list()
    const indexCart = carts.findIndex(item => item.externalID === parseInt(idCart))

    carts[indexCart] = cart

    await this.writeFile(carts)

    return cart
  }

  async delete (id) {
    const list = await this.list()

    const index = list.findIndex(item => item.externalID === id)
    list.splice(index, 1)

    await this.writeFile(list)

    return id
  }
}

export { CartDaoMemory }
