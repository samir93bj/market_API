import { uploadFile } from '../business/upload.service.js'

class UploadFileService {
  async uploadFile (file, req) {
    return await uploadFile(file, req)
  }
}

export default UploadFileService
