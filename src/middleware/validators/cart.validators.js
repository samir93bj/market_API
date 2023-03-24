import { check, param } from 'express-validator'
import { validarCampos } from './validate-camp.js'

const validationGetCart = [
  param('id', 'Invalid id. id is number').isInt(),
  validarCampos
]

const validationDeleteCart = [
  param('id', 'Invalid id. id is number').isInt(),
  validarCampos
]

const validationAddProduct = [
  param('idCart', 'Invalid id. id is number').isInt(),
  check('id', 'Id product is required').not().isEmpty(),
  check('id', 'Invalid id. id is number').isInt(),
  validarCampos
]

const validationDeleteProductCart = [
  param('id', 'Invalid id. Id cart is number').isInt(),
  param('id_prod', 'Invalid id. Id product is number').isInt(),
  validarCampos
]

export { validationAddProduct, validationGetCart, validationDeleteCart, validationDeleteProductCart }
