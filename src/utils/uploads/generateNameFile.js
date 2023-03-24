import { v4 as uuidv4 } from 'uuid'

export const generateNameFile = async (extensionFile) => {
  const nameTemp = uuidv4() + '.' + extensionFile
  return nameTemp
}
