import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword, savePassword, salt) => {
  return await GeneratePassword(enteredPassword, salt) === savePassword
}

export const GenerateSignature = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' })
}

export const ValidateSignature = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    try {
      const payload = jwt.verify(signature, config.JWT_SECRET)
      req.user = payload

      return true
    } catch {
      return false
    }
  } else {
    return false
  }
}
