import { list, getById, save, update, deleteById } from '../business/product.service.js'

class ProductService {
  async list () {
    const productos = await list()

    return productos
  }

  async getById (id) {
    const result = await getById(id)
    return result
  }

  async save (product) {
    const producSaved = await save(product)

    return producSaved
  }

  async update (id, data) {
    await this.getById(id)
    const productUp = await update(id, data)

    return productUp
  }

  async delete (id) {
    await deleteById(id)

    return id
  }
}

export default ProductService
