import Strategy from 'passport-local'
import { login } from '../../../business/user.service.js'

const localStrategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const token = await login({ username, password })

    return done(null, token)
  } catch (err) {
    done(err, false)
  }
})

export default localStrategy
