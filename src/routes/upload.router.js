import express from 'express'
import { validateFileUpload } from '../middleware/validators/uploads.validators.js'
import UploadFileService from '../service/uploads.service.js'
import { success } from '../networks/responses.js'
import { Authenticate } from '../middleware/auth.handler.js'

const uploadFileService = new UploadFileService()

const router = express.Router()

router.post('/',
  Authenticate,
  validateFileUpload,
  async (req, res, next) => {
    try {
      const { file } = req.files
      const resultUploadfile = await uploadFileService.uploadFile(file, req)

      return success(req, res, 200, resultUploadfile)
    } catch (err) {
      next(err)
    }
  })

export { router }
