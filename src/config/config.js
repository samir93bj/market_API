import * as dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV || 'prod'

let urimongoDB = process.env.MONGO_URI_ENV

if (env === 'dev') {
  urimongoDB = 'mongodb://127.0.0.1:27017'
}

const config = {
  env,
  port: process.env.PORT || 8080,
  admin: true,
  dataBase: 'mongoDB',
  email: {
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUTN_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    numberFrom: process.env.TWILIO_SEND_FROM,
    numberTo: process.env.TWILIO_SEND_TO
  },
  mongodb: {
    uri: urimongoDB
  },
  JWT_SECRET: process.env.JWT_SECRET_KEY
}

export { config }
