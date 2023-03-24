import error from '../error.js'

export const validateExtensionFile = (file, extensionValids = ['png', 'jpg', 'gif', 'jpeg'], folder = '') => {
  const nameFile = file.name.split('.')
  const nameExtensionFile = nameFile[nameFile.length - 1]

  if (!extensionValids.includes(nameExtensionFile)) {
    throw error(`Extension is not allowed. Extension allowed: ${extensionValids}`, 400)
  }

  return nameExtensionFile
}
