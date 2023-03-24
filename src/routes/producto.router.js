import express from 'express'
import { success } from '../networks/responses.js'
import ProductService from '../service/producto.service.js'
import { validationCreate, updateProduct, deleteProduct, getProduct } from '../middleware/validators/product.validators.js'
import { isAdminRole, Authenticate } from '../middleware/auth.handler.js'

const service = new ProductService()
const router = express.Router()

router.get('/',
  async (req, res, next) => {
    try {
      const products = await service.list()
      return success(req, res, 200, products)
    } catch (err) {
      next(err)
    }
  })

router.get('/:id',
  getProduct,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.getById(id)

      return success(req, res, 200, product)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  Authenticate,
  isAdminRole,
  validationCreate,
  async (req, res, next) => {
    try {
      const data = req.body
      const newProduct = await service.save(data)

      return success(req, res, 201, newProduct)
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id',
  Authenticate,
  isAdminRole,
  deleteProduct,
  async (req, res, next) => {
    try {
      const id = req.params.id
      await service.delete(id)
      return success(req, res, 200, id)
    } catch (err) {
      next(err)
    }
  })

router.put('/:id',
  Authenticate,
  isAdminRole,
  updateProduct,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const data = req.body
      const product = await service.update(id, data)

      return success(req, res, 201, product)
    } catch (err) {
      next(err)
    }
  })

export { router }
