import mongoose from 'mongoose'
import connectionData from '../db.config.js'

const Connection = async () => {
  try {
    await mongoose.connect(connectionData.connection_mongoDB.uri)
  } catch (err) {
    process.exit(1)
  }
}

const Disconnect = async () => {
  try {
    await mongoose.connection.close()
  } catch (err) {
    process.exit(1)
  }
}

export { Connection, Disconnect }
