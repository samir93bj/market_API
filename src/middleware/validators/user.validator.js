import { check, param } from 'express-validator'
import { validarCampos } from './validate-camp.js'

const validationCreate = [
  check('name', 'Name is required').not().isEmpty().escape(),
  check('direction', 'Direction is required').not().isEmpty().escape(),
  check('edad', 'Edad is required').not().isEmpty().escape(),
  check('image', 'Image is required').not().optional(),
  check('phone', 'Phone is required').not().isEmpty().escape(),
  check('username', 'Username is required').not().isEmpty().escape(),
  check('password', 'Password is required').not().isEmpty().escape(),
  validarCampos
]

const validationLogin = [
  check('username', 'Username is required').not().isEmpty().escape(),
  check('password', 'Password is required').not().isEmpty().escape(),
  validarCampos
]

const validationGetUser = [
  param('id', 'Id not is valid').isMongoId(),
  validarCampos
]

export { validationCreate, validationLogin, validationGetUser }
