import Product from '../../../db/Mongo/models/product.model.js'
import error from '../../../utils/error.js'
import { createProductDto, updateProductDto } from '../../dto/product.dto.js'

class ProductDaoMongo {
  constructor () {
    this.ProductModel = Product
  }

  async list () {
    try {
      const products = await this.ProductModel.find()
      return products
    } catch (err) {
      throw error('Internal server error', 500)
    }
  }

  async getById (id) {
    try {
      const item = await this.ProductModel.findOne({ externalID: id })
      return item
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async save (newItem) {
    try {
      const productLatest = await this.ProductModel.find({}).sort({ $natural: -1 }).limit(1)

      if (productLatest.length === 0) {
        newItem.id = 1
      } else {
        newItem.id = productLatest[0].externalID + 1
      }

      const itemFormated = createProductDto(newItem)

      const item = new this.ProductModel(itemFormated)
      const itemSave = await this.ProductModel.create(item)

      return itemSave
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async update (id, item) {
    try {
      const itemformated = updateProductDto(item)
      const newProduct = await this.ProductModel.findOneAndUpdate({ externalID: id }, itemformated)
      return newProduct
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }

  async delete (id) {
    try {
      await this.ProductModel.findOneAndRemove({ externalID: id })

      return id
    } catch (err) {
      throw error('Internal Server Error', 500)
    }
  }
}

export { ProductDaoMongo }
