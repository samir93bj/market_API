import moment from 'moment'

export const productsDtoForMongo = (products) => {
  const formattedProducts = products.map((product) => ({
    id: product.externalID,
    timestamp: product.timestamp,
    name: product.name,
    description: product.description,
    code: product.code,
    image: product.image,
    price: product.price,
    stock: product.stock
  }))
  return formattedProducts
}

export const createProductDto = (product) => {
  const formattedProduct = {
    externalID: product.id,
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
    name: product.name,
    description: product.description,
    code: product.code,
    price: product.price,
    image: product.image,
    stock: product.stock
  }

  return formattedProduct
}

export const selectProductDto = (product) => {
  const formattedProduct = {
    id: product.externalID,
    timestamp: product.timestamp,
    name: product.name,
    description: product.description,
    code: product.code,
    price: product.price,
    image: product.image,
    stock: product.stock
  }
  return formattedProduct
}

export const updateProductDto = (product) => {
  if (product.externalID) {
    delete product.externalID
  }

  if (product._id) {
    delete product._id
  }

  if (product.timestamp) {
    delete product.timestamp
  }

  if (product.__v) {
    delete product.__v
  }
  return product
}
