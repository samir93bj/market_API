import CartDaoRepository from '../persistence/repository/cart.repository.js'
import { getById as productGetById } from './product.service.js'
import error from '../utils/error.js'
import ProductRepository from '../persistence/repository/product.repository.js'
import { selectCartDto, selectCartsDto } from '../persistence/dto/cart.dto.js'

const productRepository = new ProductRepository()
const cartDaoRepository = new CartDaoRepository()

const list = async () => {
  const carts = await cartDaoRepository.list()

  return selectCartsDto(carts)
}

const getById = async (id) => {
  const cart = await cartDaoRepository.getById(id)

  if (!cart) {
    throw error('Cart inexistent', 400)
  }

  return selectCartDto(cart)
}

const save = async () => {
  const cart = await cartDaoRepository.save()
  return selectCartDto(cart)
}

const addProduct = async (id, idProduct) => {
  await getById(id)
  await productGetById(idProduct)

  const product = await productRepository.getById(idProduct)
  const cart = await cartDaoRepository.getById(id)

  await cartDaoRepository.addProduct(cart, product)

  const cartUpdated = await getById(id)
  return cartUpdated
}

const deleteProduct = async (idCart, idProduct) => {
  await getById(idCart)
  await productGetById(idProduct)

  const product = await productRepository.getById(idProduct)
  await cartDaoRepository.deleteProduct(idCart, product)

  return await getById(idCart)
}

const deleteById = async (id) => {
  await cartDaoRepository.delete(id)

  return id
}

export { list, getById, save, addProduct, deleteProduct, deleteById }
