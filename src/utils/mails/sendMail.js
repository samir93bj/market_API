import nodemailer from 'nodemailer'
import { config } from '../../config/config.js'

export const sendMaild = async (infoEmail) => {
  let infoEmailHTML = ''
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, /* true for 465, false for other ports */
    port: 465,
    auth: {
      user: config.email.emailUser,
      pass: config.email.emailPassword
    }
  })

  if (infoEmail.subject === 'Detalle de compra.') {
    infoEmailHTML = `Hola: ${infoEmail.clientName}!<br><h3>Detalles de factura: </h3><br> ${infoEmail.html}`
  } else {
    infoEmailHTML = `${infoEmail.infoUser}`
  }

  await transporter.sendMail({
    from: config.email.emailUser,
    to: [`${config.email.emailUser}, ${infoEmail.to}`],
    subject: infoEmail.subject,
    html: infoEmailHTML
  })

  return 'Email sent subject'
}
