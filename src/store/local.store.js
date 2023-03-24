import error from '../utils/error.js'
import fs from 'fs'
import moment from 'moment'

class Store {
  constructor (nameFile) {
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
    const productos = await this.readFile()
    return productos
  }

  async getById (id) {
    const data = await this.readFile()
    const product = data.find(item => item.id === parseInt(id)) || null

    if (!product) {
      throw error('Product not exist', 400)
    }

    return product
  }

  async save (product) {
    const data = await this.readFile()

    if (data.length === 0) {
      product.id = 1
    } else {
      const lastProduct = data[data.length - 1]
      const id = lastProduct.id + 1

      product.id = id
    }

    if (!product.stock) {
      product.stock = 0
    }

    const newProduc = {
      id: product.id,
      timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
      name: product.name,
      description: product.description,
      code: product.code,
      image: product.image,
      price: product.price,
      stock: product.stock
    }

    data.push(newProduc)

    await this.writeFile(data)

    return newProduc
  }

  async update (id, data) {
    const product = await this.getById(id)
    const list = await this.list()

    const upProduct = {
      id: product.id,
      timestamp: product.timestamp
    }

    upProduct.name = (!data.name) ? product.name : data.name
    upProduct.description = (!data.description) ? product.description : data.description
    upProduct.code = (!data.code) ? product.code : data.code
    upProduct.image = (!data.image) ? product.image : data.image
    upProduct.price = (!data.price) ? product.price : data.price
    upProduct.stock = (!data.stock) ? product.stock : data.stock

    const index = list.findIndex(item => item.id === parseInt(id))
    list[index] = upProduct

    await this.writeFile(list)

    return upProduct
  }

  async delete (id) {
    const product = await this.getById(id)
    const list = await this.list()

    const index = list.findIndex(item => item.id === product.id)
    list.splice(index, 1)

    await this.writeFile(list)

    return id
  }

  async modifStock (id) {

  }
}

export default Store
