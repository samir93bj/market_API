import { config } from '../../config/config.js'

export const structureEmail = (infoEmail) => {
  const formattedMail = {
    from: infoEmail.emailUser,
    to: infoEmail.emailClient,
    subject: 'Detalle de compra.',
    clientName: infoEmail.client,
    whatsapp: infoEmail.cart.map(cart => `Nombre: ${cart.name},\n Price:$ ${cart.price}, \n Description: ${cart.description}`),
    html: infoEmail.cart.map(cart => `<br><p> <span>Nombre: </span>${cart.name},  <span>Price:</span> $ ${cart.price}, Description: ${cart.description}, Image: <img src="${cart.image}"> </p><br>`)
  }

  return formattedMail
}

export const structureEmailNewUser = (infoNewUser) => {
  const formattedMail = {
    from: config.email.emailUser,
    to: config.email.emailUser,
    subject: 'Nuevo registro.',
    infoUser: infoNewUser
  }

  return formattedMail
}
