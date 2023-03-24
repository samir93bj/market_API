import { ValidateSignature } from '../utils/auth.js'

const isAdminRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    })
  } else {
    next()
  }
}

const Authenticate = async (req, res, next) => {
  const validate = await ValidateSignature(req)
  if (validate) {
    next()
  } else {
    return res.status(401).json({
      error: true,
      message: 'Token is required and must be valid'
    })
  }
}

export { isAdminRole, Authenticate }
