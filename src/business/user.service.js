import { createUserDto } from '../persistence/dto/user.dto.js'
import UserRepository from '../persistence/repository/user.repository.js'
import error from '../utils/error.js'
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utils/auth.js'
import { sendMaild } from '../utils/mails/sendMail.js'
import { structureEmailNewUser } from '../utils/mails/mail.dto.js'
import { sendWhatsappMessage } from '../utils/notify/twilio.js'
const userRepository = new UserRepository()

const list = async () => {
  const users = await userRepository.list()
  return users
}

const getById = async (userId) => {
  const user = await userRepository.getById(userId)

  if (!user) {
    throw error('User not found.', 400)
  }

  return user
}

const getByUsername = async (userName) => {
  const user = await userRepository.getByUsername(userName)

  if (!user) {
    return false
  }

  return user
}

const save = async (user) => {
  const userSearch = await getByUsername(user.username)

  if (userSearch) {
    throw error('User already exist.', 400)
  }

  const salt = await GenerateSalt()
  user.password = await GeneratePassword(user.password, salt)
  user.salt = salt

  const userFormated = createUserDto(user)
  const userSaved = await userRepository.save(userFormated)

  const signature = GenerateSignature({ id: userSaved._id, username: userSaved.username })

  await sendMaild(structureEmailNewUser(user))

  await sendWhatsappMessage(user)

  return signature
}

const login = async (userAndPassword) => {
  const user = await getByUsername(userAndPassword.username)

  if (!user) {
    throw error('User or Password is not valid.', 400)
  }

  const resultValidatePassword = await ValidatePassword(userAndPassword.password, user.password, user.salt)

  if (!resultValidatePassword) {
    throw error('User or Password is not valid.', 400)
  }

  const signature = GenerateSignature({ id: user.id, username: user.username, role: user.role })

  return signature
}

export { save, list, getById, login }
