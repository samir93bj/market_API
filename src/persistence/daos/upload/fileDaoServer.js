import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import error from '../../../utils/error.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
class FileDaoUploadServer {
  constructor () {
    this.folder = 'users'
    this.folderDir = '../../../uploads/'
  }

  moveFileUpload = (file, nameTempFile) => {
    try {
      const uploadsPath = path.join(__dirname, this.folderDir, this.folder, nameTempFile)
      file.mv(uploadsPath)

      return this.nameTempFile
    } catch (err) {
      throw error('System error', 500)
    }
  }

  assignedFileToModel = async (nameTempFile, model) => {
    try {
      model.image = nameTempFile
      await model.save()
    } catch (err) {
      throw error('System error', 500)
    }
  }

  deleFileIfAlreadyExist = async (model) => {
    try {
      if (model.image) {
        const pathImage = path.join(__dirname, this.folderDir, this.folder, model.image)

        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage)
        }
      }
    } catch (err) {
      throw error('System error', 500)
    }
  }
}

export { FileDaoUploadServer }
