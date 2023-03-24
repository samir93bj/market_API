import { createLoggerWinston as logger } from '../logger/winston/logger.js'

export default function error (message, code) {
  const e = new Error(message)

  if (code) {
    e.statusCode = code
  }

  switch (code) {
    case 500:
      logger.error(`StatusCode: ${code}, Message:${message}`)
      break
    case 401:
      logger.warn(`StatusCode: ${code}, Message:${message}`)
      break
    case 400:
      logger.error(`StatusCode: ${code}, Message:${message}`)
      break
  }

  return e
}
