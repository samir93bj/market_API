import Express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { errors } from './networks/error.js'
import { apiRouter } from './routes/index.js'
import passport from 'passport'
import { InitializeStrategies } from './utils/passport/index.js'
import fileUpload from 'express-fileupload'

const CreaterApp = () => {
  const app = new Express()

  app.use(helmet())

  app.use(Express.json())
  app.use(compression())
  app.use(cookieParser())

  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
  }))

  InitializeStrategies()
  app.use(passport.initialize())

  apiRouter(app)

  app.use(errors)

  return app
}

export { CreaterApp }
