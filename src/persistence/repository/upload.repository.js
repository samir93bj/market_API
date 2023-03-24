import FileDaoFactory from '../daos/upload/fileDaoFactory.js'
const fileDaoFactory = new FileDaoFactory()

class FileRepository {
  constructor () {
    this.dao = fileDaoFactory.getDao()
  }

  async moveFileUpload (file, nameTempFile) {
    return this.dao.moveFileUpload(file, nameTempFile)
  }

  async assignedFileToModel (nameTempFile, model) {
    return this.dao.assignedFileToModel(nameTempFile, model)
  }

  async deleFileIfAlreadyExist (model) {
    return this.dao.deleFileIfAlreadyExist(model)
  }
}

export default FileRepository
