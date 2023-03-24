import express from 'express'

import { router as productRouter } from '../routes/producto.router.js'
import { router as cartRouter } from '../routes/cart.router.js'
import { router as userRouter } from '../routes/user.router.js'
import { router as uploadRouter } from '../routes/upload.router.js'
import { router as buyRouter } from '../routes/buy.router.js'

const router = express.Router()

function apiRouter (app) {
  app.use('/api', router)
  router.use('/productos', productRouter)
  router.use('/carrito', cartRouter)
  router.use('/users', userRouter)
  router.use('/uploads', uploadRouter)
  router.use('/buy', buyRouter)

  app.use('*', async (req, res, next) => {
    res.status(400).json({
      error: -2,
      description: {
        route: req.baseUrl,
        method: req.method,
        msg: 'not implemented'
      }
    })
  })
}

export { apiRouter }
