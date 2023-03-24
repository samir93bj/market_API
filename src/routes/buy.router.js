import express from 'express'
import { success } from '../networks/responses.js'
import BuyService from '../service/buy.service.js'
import { Authenticate } from '../middleware/auth.handler.js'
import { validatorInputBuy } from '../middleware/validators/buy.validators.js'
const buyService = new BuyService()

const router = express.Router()

router.post('/',
  Authenticate,
  validatorInputBuy,
  async (req, res, next) => {
    try {
      const saleSaved = await buyService.save(req.body.IdCart, req)
      return success(req, res, 200, saleSaved)
    } catch (e) {
      next(e)
    }
  })

export { router }
