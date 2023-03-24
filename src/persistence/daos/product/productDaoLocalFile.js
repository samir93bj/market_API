import fs from 'fs'
import { createProductDto } from '../../dto/product.dto.js'

class ProductMemoryDao {
  constructor (nameFile = 'productos.json') {
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
    const product = data.find(item => item.externalID === parseInt(id)) || null

    return product
  }

  async save (product) {
    const data = await this.readFile()

    if (data.length === 0) {
      product.id = 1
    } else {
      const lastProduct = data[data.length - 1]
      const id = lastProduct.externalID + 1

      product.id = id
    }

    if (!product.stock) {
      product.stock = 0
    }

    const newProduc = createProductDto(product)

    data.push(newProduc)

    await this.writeFile(data)

    return newProduc
  }

  async update (id, data) {
    const product = await this.getById(id)
    const list = await this.list()

    const upProduct = {
      id: product.externalID,
      timestamp: product.timestamp
    }

    upProduct.name = (!data.name) ? product.name : data.name
    upProduct.description = (!data.description) ? product.description : data.description
    upProduct.code = (!data.code) ? product.code : data.code
    upProduct.image = (!data.image) ? product.image : data.image
    upProduct.price = (!data.price) ? product.price : data.price
    upProduct.stock = (!data.stock) ? product.stock : data.stock

    const updatedProduct = createProductDto(upProduct)

    updatedProduct.timestamp = product.timestamp

    const index = list.findIndex(item => item.externalID === parseInt(id))
    list[index] = updatedProduct

    await this.writeFile(list)

    return upProduct
  }

  async delete (id) {
    const product = await this.getById(id)
    const list = await this.list()

    const index = list.findIndex(item => item.externalID === product.externalID)
    list.splice(index, 1)

    await this.writeFile(list)

    return id
  }

  async modifStock (id) {

  }
}

export { ProductMemoryDao }
