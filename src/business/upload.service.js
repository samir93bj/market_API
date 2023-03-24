import { validateExtensionFile } from '../utils/uploads/validateExtensionFile.js'
import { generateNameFile } from '../utils/uploads/generateNameFile.js'
import FileRepository from '../persistence/repository/upload.repository.js'
import UserService from '../service/user.service.js'

const fileRepository = new FileRepository()
const userService = new UserService()

const uploadFile = async (file, req) => {
  const extensionFile = await validateExtensionFile(file)
  const newNameFile = await generateNameFile(extensionFile)

  const user = await userService.getById(req.user.id)

  await fileRepository.deleFileIfAlreadyExist(user)
  await fileRepository.assignedFileToModel(newNameFile, user)
  await fileRepository.moveFileUpload(file, newNameFile)

  return newNameFile
}

export { uploadFile }
