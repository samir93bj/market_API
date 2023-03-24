import { createLoggerWinston as logger } from './logger/winston/logger.js'
import os from 'os'
import { args } from './utils/args/parseArgs.js'
import cluster from 'cluster'
import { CreaterApp } from './createrApp.js'
import { config } from './config/config.js'

const app = CreaterApp()

if (args.mode === 'cluster' && cluster.isPrimary) {
  logger.info('modo cluster')
  const numCPUS = os.cpus().length
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(`El subproceso ${worker.process.pid} falló`)
    cluster.fork()
  })
} else {
  app.listen(config.port, () => {
    logger.info(`listening on port ${config.port} on process ${process.pid}`)
  })
}
