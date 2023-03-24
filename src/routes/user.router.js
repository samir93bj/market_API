import express from 'express'
import UserService from '../service/user.service.js'
import { success } from '../networks/responses.js'
import { validationCreate, validationGetUser } from '../middleware/validators/user.validator.js'
import { Authenticate, isAdminRole } from '../middleware/auth.handler.js'
import passport from 'passport'

const router = express.Router()
const userService = new UserService()

router.get('/',
  Authenticate,
  isAdminRole,
  async (req, res, next) => {
    try {
      const users = await userService.list()
      return success(req, res, 200, users)
    } catch (err) {
      next(err)
    }
  })

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const userLogedToken = await userService.login(req.body)

      res.cookie('token', userLogedToken, { httpOnly: true })
      return success(req, res, 200, userLogedToken)
    } catch (err) {
      next(err)
    }
  })

router.post('/logout',
  async (req, res, next) => {
    try {
      res.clearCookie('token')
      return success(req, res, 200, 'User logout successfully')
    } catch (err) {
      next(err)
    }
  }
)

router.get('/:id',
  Authenticate,
  isAdminRole,
  validationGetUser,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await userService.getById(id)

      return success(req, res, 200, user)
    } catch (err) {
      next(err)
    }
  })

router.post('/',
  validationCreate,
  async (req, res, next) => {
    try {
      const userSavedToken = await userService.save(req.body)

      return success(req, res, 200, userSavedToken)
    } catch (err) {
      next(err)
    }
  })

export { router }
