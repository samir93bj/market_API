import moment from 'moment'
import { selectProductDto } from './product.dto.js'

export const selectCartsDto = (carts) => {
  const formattedSCarts = carts.map(
    (cart) => ({
      id: cart.externalID,
      timestamp: cart.timestamp,
      products: cart.products.map((product) => selectProductDto(product))
    })
  )
  return formattedSCarts
}

export const createCartDto = (cart) => {
  const formattedCart = {
    externalID: cart.id,
    timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
    products: []
  }
  return formattedCart
}

export const selectCartDto = (cart) => {
  const formattedSCart = {
    id: cart.externalID,
    timestamp: cart.timestamp,
    products: cart.products.map((product) => selectProductDto(product))
  }
  return formattedSCart
}
