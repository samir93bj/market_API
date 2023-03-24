import { config } from '../config/config.js'
import { createSaleDto, sendMailSaleDto } from '../persistence/dto/buy.dto.js'
import BuyDaoRepository from '../persistence/repository/buy.repository.js'
import CartDaoRepository from '../persistence/repository/cart.repository.js'
import { structureEmail } from '../utils/mails/mail.dto.js'
import { sendMaild } from '../utils/mails/sendMail.js'
import UserRepository from '../persistence/repository/user.repository.js'
import { sendWhatsappMessage } from '../utils/notify/twilio.js'
import error from '../utils/error.js'

const cartDaoRepository = new CartDaoRepository()
const userDaoRepository = new UserRepository()
const buyDaoRepository = new BuyDaoRepository()

const list = async () => {
  const sales = await buyDaoRepository.list()
  return sales
}

const getById = async (id) => {
  const sale = await buyDaoRepository.getById(id)
  return sale
}

const save = async (idCart, req) => {
  const cart = await cartDaoRepository.getById(parseInt(idCart))

  if (!cart) {
    throw error('Cart inexistent', 400)
  }

  const user = await userDaoRepository.getById(req.user.id)

  const formatedCartEmail = await sendMailSaleDto(cart.products)

  const newSale = {
    idUser: user._id,
    idCart: cart._id
  }

  const infoEmail = {
    emailUser: config.email.emailUser,
    emailClient: req.user.username,
    client: user.name,
    cart: formatedCartEmail
  }

  const structuredEmail = structureEmail(infoEmail)
  await sendMaild(structuredEmail)
  await sendWhatsappMessage(structuredEmail)

  const saleSaved = await buyDaoRepository.save(newSale)
  const saleFormated = createSaleDto(saleSaved)

  return saleFormated
}

export { list, getById, save }
