import { config } from '../config/config.js'

const connectionData = {
  connection_mongoDB: {
    uri: config.mongodb.uri
  }
}

export default connectionData
