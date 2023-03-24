import { createLogger, format, transports } from 'winston'
// eslint-disable-next-line no-unused-vars
import * as MongoDB from 'winston-mongodb'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { config } from '../../config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const levels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
  tracker: 'tracker'
}

export const createLoggerWinston = createLogger({
  transports: [
    new transports.File({
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
      ),
      maxsize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),

    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
      )
    }),

    new transports.MongoDB({
      format: format.combine(format.json()),
      level: levels.error,
      db: config.mongodb.uri,
      options: {
        useUnifiedTopology: true
      },
      collection: 'logs'
    }),

    new transports.MongoDB({
      format: format.combine(format.json()),
      level: levels.warn,
      db: config.mongodb.uri,
      options: {
        useUnifiedTopology: true
      },
      collection: 'logs'
    })
  ]
})
