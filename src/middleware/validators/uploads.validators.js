import error from '../../utils/error.js'

const validateFileUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    throw error('Not Found file upload.', 400)
  }

  next()
}

export { validateFileUpload }
