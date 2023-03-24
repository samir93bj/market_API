import { error } from '../networks/responses.js'

function errors (err, req, res, next) {
  const message = err.message || 'Internal server error'
  const status = err.statusCode || 500

  error(req, res, status, message)
}

export { errors }
