import { createLoggerWinston as logger } from '../logger/winston/logger.js'

function success (req, res, status, msg) {
  const statusCode = status || 200
  const statusMessage = msg || ''

  logger.info(`StatusCode: ${statusCode}, RoutePath: ${req.path}, Method:${req.protocol}`)

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

function error (req, res, status, msg) {
  const statusCode = status || 500
  const statusMessage = msg || 'Internal server error'

  res.status(statusCode).json({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}

export { success, error }
