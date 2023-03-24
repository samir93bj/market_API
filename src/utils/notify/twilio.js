import { config } from '../../config/config.js'
import twilio from 'twilio'

export const sendWhatsappMessage = async (body) => {
  try {
    const accountSid = config.twilio.accountSid
    const authToken = config.twilio.authToken
    const client = twilio(accountSid, authToken)

    let HTMLMessage
    if (body.clientName) {
      HTMLMessage = `Cliente: ${body.clientName}, \n Detalle productos: ${body.whatsapp}`
    } else {
      HTMLMessage = `Nuevo Usuario Registrado \nCliente: ${body.name} \n Direccion: ${body.direction} \n Phone: ${body.phone} \n Email: ${body.username}`
    }

    client.messages.create({
      from: `${config.twilio.numberFrom}`,
      body: HTMLMessage,
      to: `${config.twilio.numberTo}`
    })
  } catch (err) {
    return false
  }
}
