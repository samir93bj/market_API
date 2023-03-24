import passport from 'passport'
import localStrategy from './strategies/local.strategies.js'
import { jwtStrategy } from './strategies/jwt.strategies.js'

export const InitializeStrategies = () => {
  passport.use(localStrategy)
  passport.use(jwtStrategy)
}
