import { check } from 'express-validator'
import { validarCampos } from './validate-camp.js'

const validatorInputBuy = [
  check('IdCart', 'Invalid id cart. This id is number').isInt(),
  validarCampos
]

export { validatorInputBuy }
